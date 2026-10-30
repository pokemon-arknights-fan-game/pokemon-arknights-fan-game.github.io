import { pokemonCards, rarityRules } from "../../../data/pokemon-gen1.js";
import { getInventory, loadDecks, saveDeck, deleteDeck, selectDeck, isStorageAvailable, MAX_DECK_SIZE, validateDeck } from "../deck-store.js";
const byId = new Map(pokemonCards.map(card => [card.id, card]));
function el(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function notice(text) { document.getElementById("deck-message").textContent = text; }
function storageNotice() { if (!isStorageAvailable()) notice("저장소를 사용할 수 없어 이번 실행 동안만 덱이 유지됩니다."); }
function countsOf(ids) { const result = new Map(); for (const id of ids) result.set(id, (result.get(id) || 0) + 1); return result; }
function lifecycle() { const controller = new AbortController(); return { listen: (node, type, fn) => node.addEventListener(type, fn, { signal: controller.signal }), stop: () => controller.abort() }; }
function renderCatalog(ids = null) {
  const grid = document.getElementById("collection-grid");
  const query = document.getElementById("card-search").value.trim().toLowerCase();
  const rarity = document.getElementById("rarity-filter").value;
  const counts = countsOf(ids || []), inventory = getInventory();
  const cards = pokemonCards.filter(card => (!rarity || card.rarity === rarity) && (!query || `${card.name} ${card.id} ${String(card.dexNumber).padStart(3, "0")}`.toLowerCase().includes(query)));
  grid.replaceChildren();
  for (const card of cards) {
    const article = el("article", undefined, "collection-card");
    article.dataset.rarity = card.rarity;
    article.style.setProperty("--card-color", card.color);
    article.append(el("span", `${String(card.dexNumber).padStart(3, "0")} · ${rarityRules.labels[card.rarity]}`, "card-meta"), el("h3", card.name), el("span", `${card.role} · 저지 ${card.blockCount}`, "card-meta"), el("span", `DP ${card.dpCost} · ⚔ ${card.attack} · HP ${card.maxHp}`, "card-meta"), el("span", `보유 ${inventory[card.id]}장`, "card-meta"));
    if (ids) {
      const actions = el("div", undefined, "card-quantity");
      for (const [action, text] of [["remove", "빼기"], ["add", "추가"]]) {
        const button = el("button", text);
        button.type = "button"; button.dataset[action] = card.id;
        button.setAttribute("aria-label", `${card.name} 한 장 ${action === "add" ? "추가" : "제거"}`);
        button.disabled = action === "add" ? ids.length >= MAX_DECK_SIZE || (counts.get(card.id) || 0) >= Math.min(3, inventory[card.id]) : !counts.get(card.id);
        actions.append(button);
        if (action === "remove") actions.append(el("strong", `${counts.get(card.id) || 0} / 3`));
      }
      article.append(actions);
    }
    grid.append(article);
  }
  if (!cards.length) grid.append(el("p", "검색 결과가 없습니다."));
}
function filters(life, render) {
  life.listen(document.getElementById("card-search"), "input", render);
  life.listen(document.getElementById("rarity-filter"), "change", render);
}
export function mountCards() {
  const life = lifecycle();filters(life, () => renderCatalog());renderCatalog();return life.stop;
}
function mountList(selection) {
  const life = lifecycle(), list = document.getElementById("deck-list");
  function render() {
    const state = loadDecks();list.replaceChildren();
    for (const deck of state.decks) {
      const article = el("article", undefined, "deck-tile");
      article.append(el("h2", deck.name), el("p", `${deck.cards.length} / 40장${validateDeck(deck.cards).length ? " · 미완성" : ""} · ${new Set(deck.cards).size}종${state.selectedId === deck.id ? " · 선택한 덱" : ""}`, "deck-hint"));
      const preview = [...new Set(deck.cards)].slice(0, 6).map(id => byId.get(id).name).join(" · ");
      article.append(el("p", preview, "deck-hint"));
      const actions = el("div", undefined, "deck-actions");
      const edit = el("a", "수정");edit.href = `#deck-editor?id=${encodeURIComponent(deck.id)}`;actions.append(edit);
      if (selection) { const enter = el("button", "이 덱으로 전투");enter.type = "button";enter.dataset.select = deck.id;enter.disabled = validateDeck(deck.cards).length > 0;enter.title = enter.disabled ? "정확히 40장으로 수정한 뒤 선택하세요." : "";actions.append(enter); }
      else { const remove = el("button", "삭제", "secondary");remove.type = "button";remove.dataset.delete = deck.id;actions.append(remove); }
      article.append(actions);list.append(article);
    }
    if (!state.decks.length) { const empty = el("p", "아직 덱이 없습니다. 새 덱을 편성하세요."); const link = el("a", "새 덱 만들기");link.href = "#deck-editor";list.append(empty, link); }
  }
  life.listen(list, "click", event => {
    const button = event.target.closest("button");if (!button) return;
    try {
      if (button.dataset.select) { selectDeck(button.dataset.select);location.hash = "battle"; }
      else if (button.dataset.delete) {
        if (button.dataset.confirm !== "yes") { button.dataset.confirm = "yes";button.textContent = "정말 삭제";return; }
        const result = deleteDeck(button.dataset.delete);render();notice(result.persistent ? "덱을 삭제했습니다." : "삭제는 이번 실행에만 반영됩니다.");
      }
    } catch (error) { notice(error.message); }
  });
  render();storageNotice();return life.stop;
}
export const mountDeckList = () => mountList(false);
export const mountSelection = () => mountList(true);
export function mountEditor() {
  const life = lifecycle();
  const id = new URLSearchParams(location.hash.split("?")[1] || "").get("id");
  const existing = id ? loadDecks().decks.find(deck => deck.id === id) : null;
  const draft = existing ? [...existing.cards] : [];
  const name = document.getElementById("deck-name");name.value = existing?.name || "새 덱";
  function render() {
    renderCatalog(draft);
    document.getElementById("deck-total").textContent = `${draft.length} / 40`;
    const list = document.getElementById("chosen-cards");list.replaceChildren();
    for (const [unitId, count] of countsOf(draft)) {
      const row = el("div", undefined, "chosen-row");const remove = el("button", "빼기");remove.type = "button";remove.dataset.remove = unitId;remove.setAttribute("aria-label", `${byId.get(unitId).name} 한 장 제거`);
      row.append(el("span", `${byId.get(unitId).name} × ${count}`), remove);list.append(row);
    }
    if (!draft.length) list.append(el("p", "카드의 ＋ 버튼으로 편성하세요."));
  }
  life.listen(document.querySelector(".editor-columns"), "click", event => {
    const button = event.target.closest("button");if (!button || button.disabled) return;
    const unitId = button.dataset.add || button.dataset.remove;if (!unitId || !byId.has(unitId)) return;
    if (button.dataset.add) { if (draft.length < 40 && draft.filter(id => id === unitId).length < 3) draft.push(unitId); }
    else { const index = draft.indexOf(unitId);if (index >= 0) draft.splice(index, 1); }
    render();notice("");
    document.querySelector(`[data-${button.dataset.add ? "add" : "remove"}="${unitId}"]:not(:disabled)`)?.focus();
  });
  life.listen(document.getElementById("save-deck"), "click", () => {
    try {
      const result = saveDeck(id, name.value, draft);
      notice(result.persistent ? (draft.length === 40 ? "덱을 저장했습니다. 전투 덱으로 선택할 수 있습니다." : `미완성 덱을 저장했습니다. ${draft.length} / 40장 · 전투 선택은 40장 편성 후 가능합니다.`) : "저장소를 사용할 수 없어 이번 실행 동안만 유지됩니다.");
      // 새 덱 저장 후 같은 편집 화면에서 재저장해도 중복 덱을 만들지 않습니다.
      if (!id) location.hash = `deck-editor?id=${encodeURIComponent(result.id)}`;
    } catch (error) { notice(error.message); }
  });
  filters(life, render);render();storageNotice();
  if (id && !existing) { notice("존재하지 않는 덱입니다. 덱 목록에서 다시 선택하세요.");document.getElementById("save-deck").disabled = true; }
  return life.stop;
}
