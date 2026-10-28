// Pointer Events로 마우스·터치를 공통 처리합니다. 게임 규칙은 콜백에 위임합니다.
export function createCardInput(api, signal) {
  const listen = (target, type, handler) => target.addEventListener(type, handler, { signal });
  let session = null;

  function cellAt(x, y) {
    const rect = api.battlefield.getBoundingClientRect();
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return null;
    return { x: Math.floor((x - rect.left) / rect.width * api.columns), y: Math.floor((y - rect.top) / rect.height * api.rows) };
  }

  function zoneAt(x, y) {
    if (api.zones.hidden) return null;
    return [...api.zones.querySelectorAll("[data-card-mode]")].find((zone) => {
      const rect = zone.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });
  }

  function showGhost(x, y) {
    api.ghost.hidden = false;
    api.ghost.textContent = api.getLabel();
    api.ghost.style.left = `${Math.min(innerWidth - 120, Math.max(8, x + 14))}px`;
    api.ghost.style.top = `${Math.min(innerHeight - 75, Math.max(8, y - 65))}px`;
  }

  function releasePointer() {
    const previous = session;
    session = null; // capture 해제 이벤트를 정상 종료와 구분하기 위해 먼저 비웁니다.
    api.ghost.hidden = true;
    for (const zone of api.zones.querySelectorAll("[data-card-mode]")) zone.classList.remove("card-zone--hover");
    if (previous && previous.element.hasPointerCapture(previous.id)) previous.element.releasePointerCapture(previous.id);
  }

  listen(api.roster, "contextmenu", (event) => event.preventDefault());
  listen(api.roster, "dragstart", (event) => event.preventDefault());
  listen(api.roster, "pointerdown", (event) => {
    const card = event.target.closest("button[data-card-id]");
    if (!card || !api.roster.contains(card) || session || event.button !== 0 || !event.isPrimary) return;
    if (!api.onBegin(card.dataset.cardId)) return;
    event.preventDefault();
    session = { kind: "card", id: event.pointerId, element: api.roster };
    api.roster.setPointerCapture(event.pointerId);
    showGhost(event.clientX, event.clientY);
  });

  listen(api.battlefield, "pointerdown", (event) => {
    const action = api.getAction();
    if (session || event.button !== 0 || !event.isPrimary || !["skill", "deploy"].includes(action.mode)) return;
    const cell = cellAt(event.clientX, event.clientY);
    if (!cell || !api.onTarget(cell)) return;
    event.preventDefault();
    session = { kind: "map", id: event.pointerId, element: api.battlefield, x: event.clientX, y: event.clientY };
    api.battlefield.setPointerCapture(event.pointerId);
  });

  listen(document, "pointermove", (event) => {
    if (!session) {
      if (["skill", "deploy"].includes(api.getAction().mode)) api.onHover(cellAt(event.clientX, event.clientY));
      return;
    }
    if (session.id !== event.pointerId) return;
    if (session.kind === "card") {
      showGhost(event.clientX, event.clientY);
      const hit = zoneAt(event.clientX, event.clientY);
      for (const zone of api.zones.querySelectorAll("[data-card-mode]")) zone.classList.toggle("card-zone--hover", zone === hit);
    } else if (api.getAction().mode === "skill") {
      api.onHover(cellAt(event.clientX, event.clientY));
    } else {
      const dx = event.clientX - session.x;
      const dy = event.clientY - session.y;
      if (Math.hypot(dx, dy) >= 10) api.onDirection(Math.abs(dx) >= Math.abs(dy) ? (dx >= 0 ? "right" : "left") : (dy >= 0 ? "down" : "up"));
    }
  });

  listen(document, "pointerup", (event) => {
    if (!session || session.id !== event.pointerId) return;
    const kind = session.kind;
    const zone = kind === "card" ? zoneAt(event.clientX, event.clientY) : null;
    const cell = kind === "map" ? cellAt(event.clientX, event.clientY) : null;
    // 게임이 손패 DOM을 갱신하기 전에 포인터 캡처를 해제합니다.
    releasePointer();
    if (kind === "card") {
      if (zone) api.onMode(zone.dataset.cardMode);
      else api.onCancel("사용 영역 밖에 놓아 취소했습니다.");
    } else if (cell) {
      if (api.getAction().mode === "skill") api.onHover(cell);
      api.onCommit();
    } else {
      api.onCancel("맵 밖에서 놓아 취소했습니다.");
    }
  });

  listen(document, "pointercancel", (event) => {
    if (session?.id === event.pointerId) { releasePointer(); api.onCancel("포인터 조작이 중단되어 취소했습니다."); }
  });
  for (const element of [api.roster, api.battlefield]) {
    listen(element, "lostpointercapture", (event) => {
      if (session?.id === event.pointerId) { releasePointer(); api.onCancel("포인터 캡처가 해제되어 취소했습니다."); }
    });
  }
  // 화면 회전 도중에는 이전 픽셀 기준 드래그를 확정하지 않습니다.
  listen(window, "resize", () => { if (api.getAction().cardId) api.onCancel("화면 크기가 바뀌어 카드 선택을 취소했습니다."); });
  listen(window, "blur", () => api.onCancel("창 전환으로 카드 선택을 취소했습니다."));
  listen(document, "visibilitychange", () => { if (document.hidden) api.onCancel("탭을 숨겨 카드 선택을 취소했습니다."); });
  return { cancelPointer: releasePointer };
}
