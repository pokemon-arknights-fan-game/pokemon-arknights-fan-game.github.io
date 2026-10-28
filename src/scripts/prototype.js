import { pokemonCards, rarityRules } from "../../data/pokemon-gen1.js";
import { trainingDeckIds } from "../../data/training-deck.js";
import { createCardInput } from "./card-input.js";

export function createBattle(signal) {
  const listen = (target, type, handler) => target.addEventListener(type, handler, { signal });
  let disposed = false;

  // 전장 크기와 속도는 화면 픽셀 크기와 독립적인 격자 단위로 관리합니다.
  const stageConfig = {
    columns: 12,
    rows: 8,
    initialBaseHp: 3,
    enemySpeed: 1,
    enemyCount: 1,
    maxDeltaSeconds: 0.1,
    routePreviewSeconds: 1.5,
  };

  // 초기 보유량과 유닛 비용은 프로토타입 임시값입니다.
  const costConfig = {
    initialDp: 10, maxDp: 99, dpRegenSeconds: 1,
    initialPp: 0, initialPpMax: 1, maxPp: 10, ppGrowthSeconds: 60,
  };

  function createCostState() {
    return {
      dp: costConfig.initialDp, pp: costConfig.initialPp, ppMax: costConfig.initialPpMax,
      dpElapsed: 0, ppGrowthElapsed: 0,
    };
  }

  // 꺾이는 지점만 기록하고 그 사이를 직선으로 이동합니다. 대각선은 사용하지 않습니다.
  const route = [
    { x: 0, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 5 },
    { x: 8, y: 5 },
    { x: 8, y: 2 },
    { x: 11, y: 2 },
  ];

  // 지형과 이동 경로는 별개입니다. G=지상, H=언덕, X=배치 불가.
  const terrainRows = [
    "XXHHGGHHGGXX",
    "GHHGGHHGGHHG",
    "GGGGGGGGGGGG",
    "GGHGGHHGGHGG",
    "GGHGGHHGGHGG",
    "GGGGGGGGGGGG",
    "GHHGGHHGGHHG",
    "XXHHGGHHGGXX",
  ];
  // 범위 좌표는 [전방 거리, 옆 거리]이며 배치 방향에 맞춰 회전합니다.
  const attackRanges = {
    melee: [[0, 0], [1, 0]],
    flame: [[0, 0], [1, -1], [1, 0], [1, 1], [2, 0]],
    ranged: [[0, 0], [1, -1], [1, 0], [1, 1], [2, -1], [2, 0], [2, 1], [3, 0]],
  };
  const enemyStats = { attack: 2, maxHp: 9, attackInterval: 1.2, range: [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]] };

  // 151종 정의를 기존 전투가 읽는 범위 좌표와 연결합니다.
  const units = pokemonCards.map(card => ({ ...card, range: attackRanges[card.rangeId] }));
  const unitById = new Map(units.map(unit => [unit.id, unit]));
  const trainingDeck = trainingDeckIds.map(id => {
    if (!unitById.has(id)) throw new Error(`알 수 없는 훈련 덱 카드: ${id}`);
    return unitById.get(id);
  });
  if (!trainingDeck.length) throw new Error("훈련 덱은 한 장 이상이어야 합니다.");
  const cardConfig = { handSize: 9, slowScale: 0.2, ppRecovery: 1, skillCost: 1 };
  const skillDefinitions = Object.fromEntries(units.map(unit => [unit.id, unit.skill]));
  let cardSerial = 0;
  let drawIndex = 0;
  let cardInput = null;
  function drawCard() {
    const unit = trainingDeck[drawIndex % trainingDeck.length];
    drawIndex += 1;
    cardSerial += 1;
    return { instanceId: `card-${cardSerial}`, unitId: unit.id };
  }
  function createHand() { return Array.from({ length: cardConfig.handSize }, drawCard); }
  function emptyCardAction() { return { cardId: null, mode: null, target: null, locked: false }; }

  const directions = {
    right: { name: "오른쪽", arrow: "→" },
    down: { name: "아래쪽", arrow: "↓" },
    left: { name: "왼쪽", arrow: "←" },
    up: { name: "위쪽", arrow: "↑" },
  };
  const terrainNames = { ground: "지상", hill: "언덕", blocked: "배치 불가" };
  const stageTiles = terrainRows.flatMap((row, y) => [...row].map((code, x) => ({
    x, y, terrain: { G: "ground", H: "hill", X: "blocked" }[code],
  })));

  function createEnemies() {
    return Array.from({ length: stageConfig.enemyCount }, (_, index) => ({
      id: `enemy-${index + 1}`, ...route[0], nextWaypoint: 1, arrived: false, blockedBy: null,
      ...enemyStats, hp: enemyStats.maxHp, cooldown: 0, dead: false,
    }));
  }

  const gameState = {
    selectedUnitId: null,
    pendingPlacement: null,
    placements: [],
    fallenUnitIds: new Set(),
    inspectedUnitId: null,
    costs: createCostState(),
    hand: createHand(),
    graveyard: [],
    cardAction: emptyCardAction(),
    phase: "ready",
    previewElapsed: 0,
    baseHp: stageConfig.initialBaseHp,
    previousTimestamp: null,
    frameId: null,
    enemies: createEnemies(),
  };

  const view = {
    cardZones: document.getElementById("card-action-zones"),
    cardGhost: document.getElementById("card-ghost"),
    slowBadge: document.getElementById("time-scale-badge"),
    handCount: document.getElementById("hand-count"),
    graveyardCount: document.getElementById("graveyard-count"),
    graveyardList: document.getElementById("graveyard-list"),
    dp: document.getElementById("dp-value"),
    dpProgress: document.getElementById("dp-progress"),
    pp: document.getElementById("pp-value"),
    ppGrowth: document.getElementById("pp-growth"),
    battlefield: document.getElementById("battlefield"),
    hp: document.getElementById("base-hp"),
    arrived: document.getElementById("arrived-count"),
    defeated: document.getElementById("defeated-count"),
    combatStatus: document.getElementById("combat-status"),
    unitStats: document.getElementById("unit-stats"),
    status: document.getElementById("operation-status"),
    start: document.getElementById("start-button"),
    reset: document.getElementById("reset-button"),
    speed: document.getElementById("enemy-speed"),
    enemyCount: document.getElementById("enemy-count"),
    blockedCount: document.getElementById("blocked-count"),
    mapSize: document.getElementById("map-size"),
    roster: document.getElementById("unit-roster"),
    deploymentStatus: document.getElementById("deployment-status"),
    selectedName: document.getElementById("selected-unit-name"),
    selectionDetail: document.getElementById("selection-detail"),
    directionControls: document.getElementById("direction-controls"),
    confirm: document.getElementById("confirm-placement"),
    cancel: document.getElementById("cancel-placement"),
    deployedCount: document.getElementById("deployed-count"),
    tiles: [],
    cards: [],
    routePreview: null,
    routePath: null,
    enemies: [],
  };

  function createBattlefield() {
    view.battlefield.style.setProperty("--columns", stageConfig.columns);
    view.battlefield.style.setProperty("--rows", stageConfig.rows);
    view.mapSize.textContent = `${stageConfig.columns} × ${stageConfig.rows}`;

    const fragment = document.createDocumentFragment();
    for (let y = 0; y < stageConfig.rows; y += 1) {
      for (let x = 0; x < stageConfig.columns; x += 1) {
        const tile = document.createElement("button");
        tile.className = "battlefield__tile";
        tile.type = "button";
        tile.dataset.x = x;
        tile.dataset.y = y;
        const terrain = stageTiles[y * stageConfig.columns + x].terrain;
        tile.classList.add(`battlefield__tile--${terrain}`);
        view.tiles.push(tile);
        if (x === route[0].x && y === route[0].y) {
          tile.classList.add("battlefield__tile--spawn");
          tile.textContent = "출";
        }
        const base = route[route.length - 1];
        if (x === base.x && y === base.y) {
          tile.classList.add("battlefield__tile--base");
          tile.textContent = "기";
        }
        fragment.append(tile);
      }
    }
    // SVG는 지형·배치 요소와 분리된 일시적인 안내 레이어입니다.
    const svgNamespace = "http://www.w3.org/2000/svg";
    view.routePreview = document.createElementNS(svgNamespace, "svg");
    view.routePreview.classList.add("route-preview");
    view.routePreview.setAttribute("viewBox", `0 0 ${stageConfig.columns} ${stageConfig.rows}`);
    view.routePreview.setAttribute("preserveAspectRatio", "none");
    view.routePreview.setAttribute("aria-hidden", "true");
    view.routePreview.setAttribute("focusable", "false");
    view.routePath = document.createElementNS(svgNamespace, "path");
    view.routePath.setAttribute("d", route.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x + 0.5} ${point.y + 0.5}`).join(" "));
    // 전체 경로 길이를 1로 정규화해 격자 크기와 무관하게 진행률로 그립니다.
    view.routePath.setAttribute("pathLength", "1");
    view.routePreview.append(view.routePath);
    fragment.append(view.routePreview);
    view.battlefield.replaceChildren(fragment);
    createEnemyElements();
  }

  function createEnemyElements() {
    for (const element of view.enemies) element.remove();
    view.enemies = gameState.enemies.map((enemy, index) => {
      const element = document.createElement("div");
      element.className = "battlefield__enemy";
      element.dataset.enemyId = enemy.id;
      element.setAttribute("aria-hidden", "true");
      element.style.setProperty("--enemy-label-offset", `${index * 11}px`);
      element.style.setProperty("--enemy-offset", `${(index - (gameState.enemies.length - 1) / 2) * 5}px`);
      const label = document.createElement("span");
      label.textContent = gameState.enemies.length > 1 ? String(index + 1) : "적";
      const hp = document.createElement("span");
      hp.className = "enemy-hp";
      element.append(label, hp);
      view.battlefield.append(element);
      return element;
    });
  }

  function renderPrototype() {
    const costs = gameState.costs;
    view.dp.textContent = `${costs.dp} / ${costConfig.maxDp}`;
    view.dpProgress.value = costs.dp >= costConfig.maxDp ? 1 : costs.dpElapsed / costConfig.dpRegenSeconds;
    view.pp.textContent = `${costs.pp} / ${costs.ppMax}`;
    view.ppGrowth.textContent = costs.ppMax >= costConfig.maxPp ? "최대치 확장 완료" : `다음 최대치 +1까지 ${Math.max(1, Math.ceil(costConfig.ppGrowthSeconds - costs.ppGrowthElapsed - 1e-9))}초`;
    view.hp.textContent = `${gameState.baseHp} / ${stageConfig.initialBaseHp}`;
    view.arrived.textContent = `${gameState.enemies.filter((enemy) => enemy.arrived).length} / ${gameState.enemies.length}`;
    view.defeated.textContent = `${gameState.enemies.filter((enemy) => enemy.dead).length} / ${gameState.enemies.length}`;
    const blocked = gameState.enemies.filter((enemy) => enemy.blockedBy !== null && !enemy.arrived && !enemy.dead).length;
    view.blockedCount.textContent = String(blocked);
    view.enemyCount.disabled = gameState.phase !== "ready";
    view.start.disabled = gameState.phase !== "ready" || Boolean(gameState.cardAction.cardId);
    view.status.textContent = {
      ready: "준비 완료. 작전 시작을 눌러 적의 이동을 확인하세요.",
      preview: "경로 안내 중 · 안내가 완전히 끝나면 적이 출현합니다.",
      spawning: "경로 안내 완료 · 적이 곧 출현합니다.",
      running: blocked > 0 ? `저지 중 ${blocked}마리 · 저지 수를 넘은 적은 계속 이동합니다.` : "이동 중 · 적이 기지로 접근하고 있습니다.",
      finished: gameState.baseHp === 0 ? "방어 실패 · 기지 체력이 0이 되었습니다." : "작전 종료 · 모든 적이 처치되거나 기지에 도착했습니다.",
    }[gameState.phase];
    for (const [index, enemy] of gameState.enemies.entries()) {
      const element = view.enemies[index];
      element.style.left = `${((enemy.x + 0.5) / stageConfig.columns) * 100}%`;
      element.style.top = `${((enemy.y + 0.5) / stageConfig.rows) * 100}%`;
      element.hidden = gameState.phase !== "running" || enemy.arrived || enemy.dead;
      element.querySelector(".enemy-hp").textContent = `${enemy.hp}/${enemy.maxHp}`;
      element.classList.toggle("battlefield__enemy--blocked", enemy.blockedBy !== null);
    }
    renderRoutePreview();
    renderCardControls();
  }

  function renderRoutePreview() {
    const visible = gameState.phase === "preview";
    // SVG는 hidden 속성의 브라우저별 차이를 피하도록 display를 명시합니다.
    view.routePreview.style.display = visible ? "block" : "none";
    const progress = Math.min(1, gameState.previewElapsed / stageConfig.routePreviewSeconds);
    const reducedMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    // 처음 70% 동안 경로를 그리고, 다음 25% 동안 지운 뒤 마지막 5%는 비웁니다.
    const reveal = reducedMotion ? 1 : Math.min(1, progress / 0.7);
    const opacity = reducedMotion ? (progress < 0.95 ? 1 : 0) : Math.max(0, Math.min(1, (0.95 - progress) / 0.25));
    view.routePath.style.strokeDashoffset = String(1 - reveal);
    view.routePreview.style.opacity = String(opacity);
  }

  function startGame() {
    if (disposed) return;
    if (gameState.phase !== "ready" || gameState.cardAction.cardId) return;
    gameState.phase = "preview";
    gameState.previewElapsed = 0;
    gameState.previousTimestamp = null;
    renderPrototype();
    gameState.frameId = requestAnimationFrame(tick);
  }

  function resetGame() {
    cardInput?.cancelPointer();
    gameState.cardAction = emptyCardAction();
    cardSerial = 0;
    drawIndex = 0;
    gameState.hand = createHand();
    gameState.graveyard = [];
    view.graveyardList.replaceChildren();
    createUnitCards();
    if (gameState.frameId !== null) cancelAnimationFrame(gameState.frameId);
    gameState.frameId = null;
    gameState.previousTimestamp = null;
    gameState.phase = "ready";
    gameState.costs = createCostState();
    gameState.previewElapsed = 0;
    gameState.baseHp = stageConfig.initialBaseHp;
    // 원본 경로를 수정하지 않도록 시작 좌표를 별도 객체로 복사합니다.
    gameState.enemies = createEnemies();
    createEnemyElements();
    gameState.placements = [];
    gameState.fallenUnitIds.clear();
    gameState.inspectedUnitId = null;
    view.combatStatus.textContent = "전투 대기 · 적 공격 2 / HP 9 / 공격 간격 1.2초";
    gameState.selectedUnitId = null;
    gameState.pendingPlacement = null;
    renderPrototype();
    renderDeployment();
    setDeploymentMessage("초기화했습니다. 배치할 유닛을 선택하세요.");
  }

  function tick(timestamp) {
    if (disposed) return;
    gameState.frameId = null;
    if (!["preview", "spawning", "running"].includes(gameState.phase)) return;
    if (document.hidden) {
      gameState.previousTimestamp = null;
    } else {
      const deltaSeconds = gameState.previousTimestamp === null
        ? 0
        : Math.min(Math.max((timestamp - gameState.previousTimestamp) / 1000, 0), stageConfig.maxDeltaSeconds) * getTimeScale();
      gameState.previousTimestamp = timestamp;
      updateCosts(deltaSeconds);
      updateBuffs(deltaSeconds);
      if (gameState.phase === "preview") {
        gameState.previewElapsed = Math.min(stageConfig.routePreviewSeconds, gameState.previewElapsed + deltaSeconds);
        if (gameState.previewElapsed >= stageConfig.routePreviewSeconds) {
          // 레이어를 제거한 프레임에서는 아직 적을 표시하지 않습니다.
          gameState.phase = "spawning";
        }
      } else if (gameState.phase === "spawning") {
        // 다음 프레임에 출발점에서 출현합니다. 안내 시간은 이동에 소비하지 않습니다.
        gameState.phase = "running";
      } else {
        for (const enemy of gameState.enemies) updateEnemy(enemy, deltaSeconds);
        if (gameState.phase === "running") updateCombat(deltaSeconds);
      }
      renderPrototype();
    }
    if (["preview", "spawning", "running"].includes(gameState.phase)) {
      gameState.frameId = requestAnimationFrame(tick);
    }
  }

  function updateCosts(deltaSeconds) {
    if (!["preview", "spawning", "running"].includes(gameState.phase) || !Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return;
    const costs = gameState.costs;
    const beforeDp = costs.dp;
    // 소수 시간은 남겨 두어 프레임마다 반올림하면서 회복이 누락되지 않게 합니다.
    if (costs.dp < costConfig.maxDp) {
      costs.dpElapsed += deltaSeconds;
      const ticks = Math.floor((costs.dpElapsed + 1e-9) / costConfig.dpRegenSeconds);
      costs.dp = Math.min(costConfig.maxDp, costs.dp + ticks);
      costs.dpElapsed = Math.max(0, costs.dpElapsed - ticks * costConfig.dpRegenSeconds);
    }
    // 가득 찬 동안의 회복을 비축해 소비 직후 한꺼번에 채우지 않습니다.
    if (costs.dp >= costConfig.maxDp) costs.dpElapsed = 0;
    if (costs.ppMax < costConfig.maxPp) {
      costs.ppGrowthElapsed += deltaSeconds;
      const growth = Math.floor((costs.ppGrowthElapsed + 1e-9) / costConfig.ppGrowthSeconds);
      costs.ppMax = Math.min(costConfig.maxPp, costs.ppMax + growth);
      costs.ppGrowthElapsed = Math.max(0, costs.ppGrowthElapsed - growth * costConfig.ppGrowthSeconds);
    }
    if (costs.ppMax >= costConfig.maxPp) costs.ppGrowthElapsed = 0;
    // PP 최대치가 늘어도 현재 PP는 자동 회복하지 않습니다.
    if (costs.dp !== beforeDp) {
      renderDeployment();
      const selected = units.find((unit) => unit.id === gameState.selectedUnitId);
      if (selected && !gameState.pendingPlacement && (!gameState.cardAction.cardId || gameState.cardAction.mode === "deploy")) {
        setDeploymentMessage(costs.dp >= selected.dpCost ? `${selected.name} · DP가 준비되었습니다. 강조된 칸을 선택하세요.` : `${selected.name} · DP 부족: 필요 ${selected.dpCost}, 현재 ${costs.dp}.`);
      }
    }
  }

  function getBlockCapacity(placement) {
    const unit = units.find((item) => item.id === placement.unitId);
    // 기본 저지 수만 사용하며 스킬에 의한 증감은 구현하지 않습니다.
    if (!unit || unit.terrain !== "ground" || !Number.isInteger(unit.blockCount)) return 0;
    return unit.blockCount >= 0 && unit.blockCount <= 3 ? unit.blockCount : 0;
  }

  function getBlockedCount(unitId) {
    return gameState.enemies.filter((enemy) => !enemy.arrived && !enemy.dead && enemy.blockedBy === unitId).length;
  }

  function canBlockEnemy(placement, enemy) {
    const capacity = getBlockCapacity(placement);
    return !enemy.arrived && !enemy.dead && capacity > 0 && (enemy.blockedBy === placement.unitId || getBlockedCount(placement.unitId) < capacity);
  }

  // 선분과 접촉 범위를 비교해 한 프레임에 유닛을 지나치는 경우도 검출합니다.
  function distanceToBlocker(enemy, target, placement) {
    const radius = 0.4;
    const horizontal = target.x !== enemy.x;
    const axis = horizontal ? "x" : "y";
    const other = horizontal ? "y" : "x";
    if (Math.abs(enemy[other] - placement[other]) > radius) return Infinity;
    if (Math.abs(enemy[axis] - placement[axis]) <= radius) return 0;
    const direction = Math.sign(target[axis] - enemy[axis]);
    const entry = placement[axis] - direction * radius;
    const distance = (entry - enemy[axis]) * direction;
    return distance >= 0 ? distance : Infinity;
  }

  function updateEnemy(enemy, deltaSeconds) {
    if (enemy.arrived || enemy.dead) return;
    if (enemy.blockedBy !== null) {
      const blocker = gameState.placements.find((item) => item.unitId === enemy.blockedBy);
      if (blocker && canBlockEnemy(blocker, enemy)) return;
      enemy.blockedBy = null;
      renderDeployment();
    }
    let remainingDistance = stageConfig.enemySpeed * deltaSeconds;
    while (remainingDistance > 0 && !enemy.arrived) {
      const target = route[enemy.nextWaypoint];
      const dx = target.x - enemy.x;
      const dy = target.y - enemy.y;
      const distance = Math.hypot(dx, dy);
      const travel = Math.min(distance, remainingDistance);
      let hit = null;
      let hitDistance = Infinity;
      for (const placement of gameState.placements) {
        if (!canBlockEnemy(placement, enemy)) continue;
        const contactDistance = distanceToBlocker(enemy, target, placement);
        if (contactDistance <= travel && contactDistance < hitDistance) {
          hit = placement;
          hitDistance = contactDistance;
        }
      }
      if (hit) {
        if (distance > 0) {
          enemy.x += (dx / distance) * hitDistance;
          enemy.y += (dy / distance) * hitDistance;
        }
        enemy.blockedBy = hit.unitId;
        renderDeployment();
        return;
      }
      if (remainingDistance >= distance) {
        enemy.x = target.x;
        enemy.y = target.y;
        remainingDistance -= distance;
        enemy.nextWaypoint += 1;
        if (enemy.nextWaypoint === route.length) handleEnemyArrival(enemy);
      } else {
        enemy.x += (dx / distance) * remainingDistance;
        enemy.y += (dy / distance) * remainingDistance;
        remainingDistance = 0;
      }
    }
  }

  function handleEnemyArrival(enemy) {
    if (enemy.arrived || enemy.dead) return;
    enemy.arrived = true;
    enemy.blockedBy = null;
    gameState.baseHp = Math.max(0, gameState.baseHp - 1);
    checkBattleEnd();
    renderDeployment();
  }

  function checkBattleEnd() {
    if (gameState.baseHp <= 0 || gameState.enemies.every((item) => item.arrived || item.dead)) {
      gameState.phase = "finished";
      cardInput?.cancelPointer();
      gameState.cardAction = emptyCardAction();
      gameState.pendingPlacement = null;
      gameState.selectedUnitId = null;
      setDeploymentMessage("작전이 종료되었습니다. 초기화하면 다시 배치할 수 있습니다.");
    }
  }

  function getRangeCells(origin, offsets, direction = "right") {
    return offsets.map(([forward, side]) => {
      const [dx, dy] = {
        right: [forward, side], down: [-side, forward],
        left: [-forward, -side], up: [side, -forward],
      }[direction];
      return { x: origin.x + dx, y: origin.y + dy };
    });
  }

  function isInAttackRange(origin, target, offsets, direction = "right") {
    // 이동 중인 소수 좌표를 소속 격자 칸으로 변환합니다.
    const x = Math.round(target.x);
    const y = Math.round(target.y);
    return getRangeCells(origin, offsets, direction).some((cell) => cell.x === x && cell.y === y);
  }

  function findAllyTarget(placement) {
    const unit = units.find((item) => item.id === placement.unitId);
    const candidates = gameState.enemies.filter((enemy) => !enemy.dead && !enemy.arrived && isInAttackRange(placement, enemy, unit.range, placement.direction));
    // 자신이 저지한 적을 우선하고 나머지는 다음 경로 지점 인덱스 순으로 선택합니다.
    candidates.sort((a, b) => Number(b.blockedBy === placement.unitId) - Number(a.blockedBy === placement.unitId) || b.nextWaypoint - a.nextWaypoint || a.id.localeCompare(b.id));
    return candidates[0] || null;
  }

  function findEnemyTarget(enemy) {
    // 이번 적은 근접형이며 자신을 저지한 아군만 범위 내에서 공격합니다.
    const target = gameState.placements.find((item) => item.unitId === enemy.blockedBy && item.hp > 0);
    if (!target) return null;
    const origin = { x: Math.round(enemy.x), y: Math.round(enemy.y) };
    return isInAttackRange(origin, target, enemy.range) ? target : null;
  }

  function updateCombat(deltaSeconds) {
    if (gameState.phase !== "running") return;
    const strikes = [];
    for (const placement of gameState.placements) {
      const unit = units.find((item) => item.id === placement.unitId);
      placement.cooldown = Math.max(0, placement.cooldown - deltaSeconds);
      const target = findAllyTarget(placement);
      if (placement.cooldown <= 0 && target) {
        strikes.push({ target, damage: unit.attack + (placement.attackBuff || 0), label: unit.name });
        placement.cooldown = unit.attackInterval;
      }
    }
    for (const enemy of gameState.enemies) {
      if (enemy.dead || enemy.arrived) continue;
      enemy.cooldown = Math.max(0, enemy.cooldown - deltaSeconds);
      const target = findEnemyTarget(enemy);
      if (enemy.cooldown <= 0 && target) {
        strikes.push({ target, damage: enemy.attack, label: enemy.id });
        enemy.cooldown = enemy.attackInterval;
      }
    }
    // 같은 프레임의 공격을 모은 뒤 반영해 서로 동시에 쓰러질 수 있게 합니다.
    for (const strike of strikes) strike.target.hp = Math.max(0, strike.target.hp - strike.damage);
    if (!strikes.length) return;
    cleanupDefeated();
    view.combatStatus.textContent = `공격 ${strikes.length}회 · 아군 전투불능 ${gameState.fallenUnitIds.size} · 적 처치 ${gameState.enemies.filter((enemy) => enemy.dead).length}`;
    checkBattleEnd();
    renderDeployment();
  }

  function cleanupDefeated() {
    for (const enemy of gameState.enemies) {
      if (!enemy.dead && enemy.hp <= 0) {
        enemy.dead = true;
        enemy.blockedBy = null;
      }
    }
    const fallen = gameState.placements.filter((item) => item.hp <= 0);
    for (const placement of fallen) {
      gameState.fallenUnitIds.add(placement.unitId);
      for (const enemy of gameState.enemies) {
        if (enemy.blockedBy === placement.unitId) enemy.blockedBy = null;
      }
      if (gameState.inspectedUnitId === placement.unitId) gameState.inspectedUnitId = null;
    }
    gameState.placements = gameState.placements.filter((item) => item.hp > 0);
  }

  function isReservedTile(x, y) {
    return [route[0], route[route.length - 1]].some((point) => point.x === x && point.y === y);
  }

  // 화면 강조와 실제 확정이 동일한 규칙을 사용하도록 판정을 한곳에 둡니다.
  function getPlacementError(unitId, x, y) {
    if (gameState.phase === "finished") return "작전이 종료되었습니다. 먼저 초기화하세요.";
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return "하단에서 배치할 유닛을 먼저 선택하세요.";
    if (gameState.fallenUnitIds.has(unitId)) return "전투불능 유닛입니다. 초기화 후 다시 배치할 수 있습니다.";
    if (gameState.placements.some((item) => item.unitId === unitId)) return "이미 배치한 유닛입니다.";
    const tile = stageTiles.find((item) => item.x === x && item.y === y);
    if (!tile || tile.terrain === "blocked" || isReservedTile(x, y)) return "이 칸에는 배치할 수 없습니다.";
    if (gameState.placements.some((item) => item.x === x && item.y === y)) return "이미 다른 유닛이 있는 칸입니다.";
    if (tile.terrain !== unit.terrain) return `${unit.name}는 ${terrainNames[unit.terrain]}에만 배치할 수 있습니다.`;
    if (gameState.costs.dp < unit.dpCost) return `DP가 부족합니다. 필요 ${unit.dpCost}, 현재 ${gameState.costs.dp}.`;
    return "";
  }

  function setDeploymentMessage(message) {
    view.deploymentStatus.textContent = message;
  }

  function createUnitCards() {
    view.roster.replaceChildren();
    view.cards = [];
    for (const handCard of gameState.hand) {
      const unit = units.find((item) => item.id === handCard.unitId);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "unit-card";
      card.dataset.unitId = unit.id;
      card.dataset.rarity = unit.rarity;
      card.title = `${unit.name} · ${rarityRules.labels[unit.rarity]}`;
      card.dataset.cardId = handCard.instanceId;
      card.setAttribute("draggable", "false");
      card.style.setProperty("--unit-color", unit.color);
      const portrait = document.createElement("span");
      portrait.className = "unit-card__portrait";
      portrait.textContent = unit.mark;
      portrait.setAttribute("aria-hidden", "true");
      const name = document.createElement("strong");
      name.textContent = unit.name;
      const role = document.createElement("span");
      role.className = "unit-card__role";
      role.textContent = `${unit.role} · 저지 ${unit.blockCount}`;
      const stats = document.createElement("span");
      stats.className = "unit-card__stats";
      stats.textContent = `⚔ ${unit.attack} / HP ${unit.maxHp}`;
      const cost = document.createElement("span");
      cost.className = "unit-card__cost";
      cost.textContent = `DP ${unit.dpCost} · PP 1`;
      const skill = document.createElement("span");
      skill.className = "unit-card__skill";
      skill.textContent = skillDefinitions[unit.id].name;
      card.append(cost, portrait, name, stats, role, skill);
      view.roster.append(card);
      view.cards.push(card);
    }
  }

  function renderDeployment() {
    const selected = units.find((unit) => unit.id === gameState.selectedUnitId);
    const inspected = gameState.placements.find((item) => item.unitId === gameState.inspectedUnitId);
    const displayUnit = selected || units.find((unit) => unit.id === inspected?.unitId);
    const pending = gameState.pendingPlacement;
    const rangeOrigin = pending || inspected;
    const highlightedCells = displayUnit && rangeOrigin ? getRangeCells(rangeOrigin, displayUnit.range, rangeOrigin.direction) : [];
    view.unitStats.textContent = gameState.cardAction.mode === "skill" && selected ? `${skillDefinitions[selected.id].name} · PP 1 · 중심 포함 3×3 범위 · ${skillDescription(selected.id)}` : displayUnit ? `소환 DP ${displayUnit.dpCost} · 공격 ${displayUnit.attack + (!selected ? inspected?.attackBuff || 0 : 0)} · HP ${inspected && !selected ? inspected.hp : displayUnit.maxHp}/${displayUnit.maxHp} · ${displayUnit.attackInterval}초마다 단일 공격` : "카드를 선택하고 칸·방향을 정하면 공격 범위가 표시됩니다. 배치한 유닛을 눌러 범위를 확인하세요.";
    view.deployedCount.textContent = `${gameState.placements.length} / ${new Set(trainingDeckIds).size}`;
    view.selectedName.textContent = displayUnit ? displayUnit.name : "선택 정보";
    view.selectionDetail.textContent = gameState.cardAction.mode === "choose"
      ? "중앙 PP 회복 · 왼쪽 스킬 · 오른쪽 배치 중 하나로 끌어 놓으세요."
      : gameState.cardAction.mode === "skill"
        ? gameState.cardAction.target ? `${gameState.cardAction.target.x + 1}열 ${gameState.cardAction.target.y + 1}행 중심 · 누른 채 옮기고 놓으면 사용` : "맵에서 스킬 중심을 누른 채 범위를 옮기고 놓으세요."
        : pending ? `${pending.x + 1}열 ${pending.y + 1}행 · 방향으로 끌고 놓으면 배치합니다.`
          : selected ? `${selected.role} · 최대 저지 ${selected.blockCount} · 강조된 빈 칸을 선택하세요.` : inspected ? `${inspected.x + 1}열 ${inspected.y + 1}행에 배치됨 · 주황색은 공격 범위` : "손패를 누르고 사용 영역으로 끌어 놓으세요.";
    view.directionControls.hidden = !pending;
    view.confirm.textContent = gameState.cardAction.mode === "skill" ? "스킬 사용" : "배치 확정";
    view.confirm.disabled = gameState.cardAction.mode === "skill" ? Boolean(getSkillError(gameState.cardAction.target)) : !pending || Boolean(getPlacementError(gameState.selectedUnitId, pending.x, pending.y));
    view.cancel.disabled = !selected && !inspected && !gameState.cardAction.cardId;
    for (const button of view.directionControls.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(Boolean(pending && pending.direction === button.dataset.direction)));
    }
    for (const card of view.cards) {
      const placed = gameState.placements.find((item) => item.unitId === card.dataset.unitId);
      const unit = units.find((item) => item.id === card.dataset.unitId);
      card.disabled = gameState.phase === "finished";
      card.classList.toggle("unit-card--unaffordable", gameState.costs.dp < unit.dpCost);
      card.setAttribute("aria-pressed", String(card.dataset.cardId === gameState.cardAction.cardId));
      card.setAttribute("aria-label", `${unit.name}, ${rarityRules.labels[unit.rarity]}, 소환 DP ${unit.dpCost}, ${gameState.costs.dp < unit.dpCost ? "DP 부족, " : ""}${unit.role}, 최대 저지 ${unit.blockCount}, 스킬 PP 1, ${skillDefinitions[unit.id].name}${placed ? ", 배치 중, 스킬과 PP 회복 가능" : ""}`);
      card.querySelector(".unit-card__stats").textContent = `⚔ ${unit.attack + (placed?.attackBuff || 0)} / HP ${gameState.placements.find((item) => item.unitId === unit.id)?.hp ?? (gameState.fallenUnitIds.has(unit.id) ? 0 : unit.maxHp)}`;
      card.querySelector(".unit-card__role").textContent = gameState.fallenUnitIds.has(unit.id) ? "전투불능" : placed ? `저지 ${getBlockedCount(unit.id)} / ${unit.blockCount}` : `${unit.role} · 저지 ${unit.blockCount}`;
    }
    for (const tile of view.tiles) {
      const x = Number(tile.dataset.x);
      const y = Number(tile.dataset.y);
      const terrain = stageTiles[y * stageConfig.columns + x].terrain;
      const placed = gameState.placements.find((item) => item.x === x && item.y === y);
      const isPending = Boolean(pending && pending.x === x && pending.y === y);
      const candidate = selected && (!gameState.cardAction.cardId || gameState.cardAction.mode === "deploy") && !getPlacementError(selected.id, x, y);
      tile.classList.toggle("battlefield__tile--skill-range", gameState.cardAction.mode === "skill" && isSkillCell({ x, y }, gameState.cardAction.target));
      tile.classList.toggle("battlefield__tile--attack-range", highlightedCells.some((cell) => cell.x === x && cell.y === y));
      tile.classList.toggle("battlefield__tile--available", Boolean(candidate));
      tile.classList.toggle("battlefield__tile--pending", isPending);
      tile.classList.toggle("battlefield__tile--occupied", Boolean(placed));
      tile.setAttribute("aria-pressed", String(isPending));
      let label = `${x + 1}열 ${y + 1}행, ${terrainNames[terrain]}`;
      tile.replaceChildren();
      if (placed || isPending) {
        const unit = units.find((item) => item.id === (placed ? placed.unitId : selected.id));
        const direction = directions[(placed || pending).direction];
        const token = document.createElement("span");
        token.className = `deployed-unit${isPending ? " deployed-unit--preview" : ""}`;
        token.style.setProperty("--unit-color", unit.color);
        token.textContent = `${unit.mark}${direction.arrow}`;
        token.setAttribute("aria-hidden", "true");
        tile.append(token);
        if (placed) {
          const hp = document.createElement("span");
          hp.className = "unit-hp";
          hp.textContent = `${placed.hp}/${unit.maxHp}`;
          tile.append(hp);
          label += `, 공격 ${unit.attack}, HP ${placed.hp}/${unit.maxHp}`;
          const badge = document.createElement("span");
          badge.className = "block-badge";
          badge.textContent = `${getBlockedCount(unit.id)}/${unit.blockCount}`;
          badge.setAttribute("aria-hidden", "true");
          tile.append(badge);
          label += `, 현재 저지 ${getBlockedCount(unit.id)}, 최대 ${unit.blockCount}`;
        }
        label += `, ${unit.name}, ${direction.name}${isPending ? ", 배치 미리보기" : ", 배치 완료"}`;
      } else if (isReservedTile(x, y)) {
        const isSpawn = x === route[0].x && y === route[0].y;
        tile.textContent = isSpawn ? "출" : "기";
        label += isSpawn ? ", 출발점, 배치 불가" : ", 기지, 배치 불가";
      } else if (terrain === "hill") {
        tile.textContent = "▴";
      } else if (terrain === "blocked") {
        tile.textContent = "×";
      }
      if (highlightedCells.some((cell) => cell.x === x && cell.y === y)) label += ", 공격 범위";
      if (candidate) label += ", 배치 가능";
      tile.setAttribute("aria-label", label);
      tile.title = label;
    }
  }

  function selectUnit(unitId) {
    const unit = units.find((item) => item.id === unitId);
    if (!unit || gameState.fallenUnitIds.has(unitId) || gameState.phase === "finished" || gameState.placements.some((item) => item.unitId === unitId)) return;
    gameState.inspectedUnitId = null;
    gameState.selectedUnitId = unitId;
    gameState.pendingPlacement = null;
    renderDeployment();
    setDeploymentMessage(gameState.costs.dp < unit.dpCost ? `${unit.name} · DP 부족: 필요 ${unit.dpCost}, 현재 ${gameState.costs.dp}.` : `${unit.name} 선택. 소환 DP ${unit.dpCost} · ${terrainNames[unit.terrain]}의 강조된 칸을 선택하세요.`);
  }

  function selectDeploymentTile(x, y) {
    const placed = gameState.placements.find((item) => item.x === x && item.y === y);
    if (!gameState.selectedUnitId && placed) {
      gameState.inspectedUnitId = placed.unitId;
      renderDeployment();
      setDeploymentMessage("주황색 테두리는 선택한 유닛의 공격 범위입니다.");
      return;
    }
    const error = getPlacementError(gameState.selectedUnitId, x, y);
    if (error) { setDeploymentMessage(error); return; }
    gameState.pendingPlacement = { x, y, direction: "right" };
    renderDeployment();
    setDeploymentMessage("배치 미리보기입니다. 방향을 정한 뒤 배치 확정을 누르세요.");
  }

  function confirmPlacement() {
    const pending = gameState.pendingPlacement;
    if (!pending) return;
    const error = getPlacementError(gameState.selectedUnitId, pending.x, pending.y);
    if (error) { setDeploymentMessage(error); return; }
    const unit = units.find((item) => item.id === gameState.selectedUnitId);
    const card = gameState.cardAction.cardId ? getActionCard() : gameState.hand.find((item) => item.unitId === unit.id);
    if (!card || card.unitId !== unit.id) { setDeploymentMessage("사용할 카드가 손패에 없습니다."); return false; }
    gameState.costs.dp -= unit.dpCost;
    gameState.placements.push({ unitId: unit.id, ...pending, hp: unit.maxHp, cooldown: 0, attackBuff: 0, buffRemaining: 0 });
    consumeHandCard(card.instanceId, "deploy");
    cardInput?.cancelPointer();
    gameState.cardAction = emptyCardAction();
    gameState.inspectedUnitId = unit.id;
    gameState.pendingPlacement = null;
    gameState.selectedUnitId = null;
    renderPrototype();
    renderDeployment();
    setDeploymentMessage(`${unit.name} 배치 완료. DP ${unit.dpCost} 소비 · ${pending.x + 1}열 ${pending.y + 1}행, ${directions[pending.direction].name}.`);
    gameState.previousTimestamp = null;
    return true;
  }

  function cancelPlacement() {
    if (gameState.cardAction.cardId) { cancelCardAction("카드 사용을 취소했습니다."); return; }
    gameState.inspectedUnitId = null;
    gameState.pendingPlacement = null;
    gameState.selectedUnitId = null;
    renderDeployment();
    setDeploymentMessage("배치 선택을 취소했습니다.");
  }

  function getActionCard() { return gameState.hand.find((card) => card.instanceId === gameState.cardAction.cardId) || null; }
  function getTimeScale() { return gameState.cardAction.cardId ? cardConfig.slowScale : 1; }
  function skillDescription(unitId) {
    const skill = skillDefinitions[unitId];
    return skill.effect === "damage" ? `적에게 피해 ${skill.amount}` : skill.effect === "heal" ? `아군 HP ${skill.amount} 회복` : `아군 공격 +${skill.amount}, ${skill.duration}초 (중첩 없이 갱신)`;
  }
  function renderCardControls() {
    // 사용 방법을 정한 뒤에는 레이어를 숨겨 맵 전체에서 위치를 고를 수 있게 합니다.
    view.cardZones.hidden = !gameState.cardAction.cardId || gameState.cardAction.mode !== "choose";
    view.slowBadge.textContent = getTimeScale() < 1 ? "SLOW ×0.2 · 카드 선택 중" : "NORMAL ×1";
    view.slowBadge.classList.toggle("slow-badge--active", getTimeScale() < 1);
    view.handCount.textContent = `${gameState.hand.length} / ${cardConfig.handSize}`;
    view.graveyardCount.textContent = String(gameState.graveyard.length);
    for (const zone of view.cardZones.querySelectorAll("[data-card-mode]")) {
      const mode = zone.dataset.cardMode;
      const disabled = mode === "recover" ? gameState.costs.pp >= gameState.costs.ppMax : mode === "skill" ? gameState.costs.pp < cardConfig.skillCost : false;
      zone.setAttribute("aria-disabled", String(disabled));
      zone.classList.toggle("card-zone--selected", mode === gameState.cardAction.mode);
    }
  }
  function consumeHandCard(cardId, use) {
    const index = gameState.hand.findIndex((card) => card.instanceId === cardId);
    if (index < 0) return false;
    const card = gameState.hand[index];
    gameState.graveyard.push({ ...card, use });
    // 같은 슬롯을 새 개체로 교체해 항상 9장을 유지합니다.
    gameState.hand[index] = drawCard();
    createUnitCards();
    view.graveyardList.replaceChildren();
    for (const entry of gameState.graveyard) {
      const item = document.createElement("li");
      item.textContent = `${units.find((unit) => unit.id === entry.unitId).name} · ${{ recover: "PP 회복", skill: "스킬", deploy: "배치" }[entry.use]} · ${entry.instanceId}`;
      view.graveyardList.append(item);
    }
    return true;
  }
  function finishCardAction(message) {
    cardInput?.cancelPointer();
    gameState.cardAction = emptyCardAction();
    gameState.selectedUnitId = null;
    gameState.pendingPlacement = null;
    gameState.previousTimestamp = null;
    renderPrototype();
    renderDeployment();
    setDeploymentMessage(message);
  }
  function cancelCardAction(message = "카드 사용을 취소했습니다.") {
    if (!gameState.cardAction.cardId) return;
    gameState.inspectedUnitId = null;
    finishCardAction(message);
  }
  function beginCardAction(cardId) {
    if (gameState.phase === "finished") return false;
    const card = gameState.hand.find((item) => item.instanceId === cardId);
    if (!card) return false;
    cardInput?.cancelPointer();
    gameState.cardAction = { ...emptyCardAction(), cardId, mode: "choose" };
    gameState.selectedUnitId = card.unitId;
    gameState.inspectedUnitId = null;
    gameState.pendingPlacement = null;
    gameState.previousTimestamp = null;
    renderPrototype(); renderDeployment();
    setDeploymentMessage("카드를 위쪽 PP 회복, 왼쪽 스킬, 오른쪽 배치 영역으로 끌어 놓으세요. 다른 곳에 놓거나 Esc로 취소합니다.");
    return true;
  }
  function chooseCardMode(mode) {
    const card = getActionCard();
    if (!card || gameState.phase === "finished") return false;
    if (mode === "recover") {
      if (gameState.costs.pp >= gameState.costs.ppMax) { finishCardAction("PP가 가득 차 카드가 소모되지 않았습니다."); return false; }
      gameState.costs.pp = Math.min(gameState.costs.ppMax, gameState.costs.pp + cardConfig.ppRecovery);
      consumeHandCard(card.instanceId, "recover");
      finishCardAction("카드 1장으로 PP 1 회복 · 새 카드가 보충되었습니다.");
      return true;
    }
    if (!["skill", "deploy"].includes(mode)) return false;
    if (mode === "skill" && gameState.costs.pp < cardConfig.skillCost) { finishCardAction("PP가 부족해 카드가 소모되지 않았습니다."); return false; }
    const unit = units.find((item) => item.id === card.unitId);
    if (mode === "deploy" && (gameState.costs.dp < unit.dpCost || gameState.placements.some((item) => item.unitId === unit.id) || gameState.fallenUnitIds.has(unit.id))) {
      finishCardAction("DP 부족 또는 이번 작전에 배치할 수 없는 포켓몬입니다. 카드는 유지됩니다."); return false;
    }
    gameState.cardAction = { cardId: card.instanceId, mode, target: null, locked: false };
    gameState.pendingPlacement = null;
    renderPrototype(); renderDeployment();
    setDeploymentMessage(mode === "skill" ? `${skillDefinitions[unit.id].name}: 맵에서 누른 채 범위를 옮기고 놓으면 사용합니다. (PP 1)` : "맵에서 배치 칸을 누른 뒤 방향으로 끌고 놓으세요. 선택 전에는 칸을 자유롭게 바꿀 수 있습니다.");
    return true;
  }
  function isSkillCell(cell, center) { return Boolean(center && Math.abs(cell.x - center.x) <= 1 && Math.abs(cell.y - center.y) <= 1); }
  function getSkillError(center) {
    if (!getActionCard() || gameState.cardAction.mode !== "skill") return "스킬 카드를 먼저 선택하세요.";
    if (gameState.phase === "finished") return "작전이 종료되었습니다.";
    if (gameState.costs.pp < cardConfig.skillCost) return "PP가 부족합니다.";
    if (!center || !Number.isInteger(center.x) || !Number.isInteger(center.y) || center.x < 0 || center.y < 0 || center.x >= stageConfig.columns || center.y >= stageConfig.rows) return "맵 안에서 중심을 선택하세요.";
    return "";
  }
  function previewCardTarget(cell) {
    if (gameState.cardAction.mode === "deploy") {
      if (gameState.cardAction.locked) return;
      gameState.pendingPlacement = cell && !getPlacementError(gameState.selectedUnitId, cell.x, cell.y) ? { ...cell, direction: "right" } : null;
    } else if (gameState.cardAction.mode === "skill") {
      gameState.cardAction.target = cell;
    } else return;
    renderDeployment();
  }
  function setCardTarget(cell) {
    if (gameState.cardAction.mode === "skill") {
      const error = getSkillError(cell);
      if (error) { setDeploymentMessage(error); return false; }
      gameState.cardAction.target = cell;
    } else if (gameState.cardAction.mode === "deploy") {
      const error = getPlacementError(gameState.selectedUnitId, cell.x, cell.y);
      if (error) { setDeploymentMessage(error); return false; }
      gameState.pendingPlacement = { ...cell, direction: "right" };
      gameState.cardAction.locked = true;
    } else return false;
    renderDeployment();
    return true;
  }
  function setCardDirection(direction) {
    if (!directions[direction] || !gameState.pendingPlacement) return;
    gameState.pendingPlacement.direction = direction;
    renderDeployment();
  }
  function commitCardTarget() {
    if (gameState.cardAction.mode === "deploy") {
      const ok = confirmPlacement();
      if (!ok) cancelCardAction("배치 조건이 바뀌어 취소했습니다. 카드와 비용은 유지됩니다.");
      return Boolean(ok);
    }
    if (gameState.cardAction.mode !== "skill") return false;
    const error = getSkillError(gameState.cardAction.target);
    if (error) { cancelCardAction(error); return false; }
    const card = getActionCard();
    const skill = skillDefinitions[card.unitId];
    const center = gameState.cardAction.target;
    gameState.costs.pp -= cardConfig.skillCost;
    let targets = 0;
    if (skill.effect === "damage" && gameState.phase === "running") {
      for (const enemy of gameState.enemies) {
        if (!enemy.dead && !enemy.arrived && isSkillCell({ x: Math.round(enemy.x), y: Math.round(enemy.y) }, center)) { enemy.hp = Math.max(0, enemy.hp - skill.amount); targets += 1; }
      }
    } else if (skill.effect !== "damage") {
      for (const placement of gameState.placements) {
        if (!isSkillCell(placement, center)) continue;
        const unit = units.find((item) => item.id === placement.unitId);
        if (skill.effect === "heal") placement.hp = Math.min(unit.maxHp, placement.hp + skill.amount);
        else { placement.attackBuff = skill.amount; placement.buffRemaining = skill.duration; }
        targets += 1;
      }
    }
    consumeHandCard(card.instanceId, "skill");
    cleanupDefeated();
    checkBattleEnd();
    finishCardAction(`${skill.name} 사용 · 대상 ${targets} · PP 1 소비 · 새 카드 보충`);
    return true;
  }
  function updateBuffs(deltaSeconds) {
    let changed = false;
    for (const placement of gameState.placements) {
      if (!(placement.buffRemaining > 0)) continue;
      placement.buffRemaining = Math.max(0, placement.buffRemaining - deltaSeconds);
      if (placement.buffRemaining === 0) { placement.attackBuff = 0; changed = true; }
    }
    if (changed) renderDeployment();
  }

  // 클릭은 키보드·보조 기술용 대체 조작입니다. 포인터는 별도 컨트롤러에서 처리합니다.
  listen(view.roster, "click", (event) => {
    if (event.detail !== 0) return;
    const card = event.target.closest("button[data-card-id]");
    if (card && view.roster.contains(card)) beginCardAction(card.dataset.cardId);
  });
  listen(view.battlefield, "click", (event) => {
    if (event.detail !== 0) return;
    const tile = event.target.closest("button[data-x]");
    if (!tile || !view.battlefield.contains(tile)) return;
    const cell = { x: Number(tile.dataset.x), y: Number(tile.dataset.y) };
    if (["skill", "deploy"].includes(gameState.cardAction.mode)) {
      if (setCardTarget(cell) && gameState.cardAction.mode === "skill") commitCardTarget();
    } else if (!gameState.cardAction.cardId) selectDeploymentTile(cell.x, cell.y);
  });
  listen(view.directionControls, "click", (event) => {
    const button = event.target.closest("button[data-direction]");
    if (!button || !view.directionControls.contains(button) || !gameState.pendingPlacement || !directions[button.dataset.direction]) return;
    gameState.pendingPlacement.direction = button.dataset.direction;
    renderDeployment();
  });
  listen(view.confirm, "click", () => gameState.cardAction.cardId ? commitCardTarget() : confirmPlacement());
  listen(view.cancel, "click", cancelPlacement);
  listen(document, "keydown", (event) => {
    if (event.key === "Escape" && (gameState.cardAction.cardId || gameState.selectedUnitId || gameState.inspectedUnitId)) cancelPlacement();
  });

  listen(view.enemyCount, "change", () => {
    if (gameState.phase !== "ready") return;
    const count = Number(view.enemyCount.value);
    if (!Number.isInteger(count) || count < 1 || count > 4) return;
    stageConfig.enemyCount = count;
    gameState.enemies = createEnemies();
    createEnemyElements();
    renderPrototype();
    renderDeployment();
  });
  listen(view.start, "click", startGame);
  listen(view.reset, "click", resetGame);
  listen(view.speed, "change", () => {
    const nextSpeed = Number(view.speed.value);
    if (Number.isFinite(nextSpeed) && nextSpeed > 0) stageConfig.enemySpeed = nextSpeed;
  });
  // 비활성 탭에서 지난 시간을 복귀 직후 이동 거리로 사용하지 않습니다.
  listen(document, "visibilitychange", () => {
    gameState.previousTimestamp = null;
  });
  cardInput = createCardInput({
    roster: view.roster, battlefield: view.battlefield, zones: view.cardZones, ghost: view.cardGhost,
    columns: stageConfig.columns, rows: stageConfig.rows,
    getAction: () => gameState.cardAction,
    getLabel: () => units.find((unit) => unit.id === getActionCard()?.unitId)?.name || "카드",
    onBegin: beginCardAction, onMode: chooseCardMode, onTarget: setCardTarget,
    onHover: previewCardTarget, onDirection: setCardDirection, onCommit: commitCardTarget, onCancel: cancelCardAction,
  }, signal);
  listen(view.cardZones, "click", (event) => {
    const zone = event.target.closest("[data-card-mode]");
    if (zone && view.cardZones.contains(zone)) chooseCardMode(zone.dataset.cardMode);
  });
  createBattlefield();
  createUnitCards();
  renderPrototype();
  renderDeployment();
  return () => {
    disposed = true;
    if (gameState.frameId !== null) cancelAnimationFrame(gameState.frameId);
    cardInput.cancelPointer();
    const help = document.getElementById("help-dialog");
    if (help.open) help.close();
  };
}
