import { pokemonCards } from "../../data/pokemon-gen1.js";
import { trainingDeckIds } from "../../data/training-deck.js";
export const catalog = new Map(pokemonCards.map(card => [card.id, card]));
export const MAX_DECK_SIZE = 40;
const KEY = "pokemon-arknights.decks.v1";
const owned = Object.fromEntries(pokemonCards.map(card => [card.id, 3]));
let memory = null;
let storageAvailable = true;
export function validateDeck(cards, { allowIncomplete = false } = {}) {
  const errors = [];
  if (!Array.isArray(cards)) return ["덱 목록 형식이 잘못되었습니다."];
  if (allowIncomplete ? cards.length > MAX_DECK_SIZE : cards.length !== MAX_DECK_SIZE) errors.push(allowIncomplete ? "덱은 최대 40장까지 저장할 수 있습니다." : "전투 덱은 정확히 40장으로 편성하세요.");
  const counts = new Map();
  for (const id of cards) {
    if (!catalog.has(id)) { errors.push("알 수 없는 카드입니다."); continue; }
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  for (const [id, count] of counts) if (count > Math.min(3, owned[id] || 0)) errors.push(`${catalog.get(id).name}: 보유량 또는 종류별 3장 제한 초과`);
  return [...new Set(errors)];
}
function initial() {
  const cards = [];
  // 기본 훈련 포켓몬을 우선 넣고 종류별 3장 이내에서 정확히 40장을 채웁니다.
  for (const id of [...trainingDeckIds, ...catalog.keys()]) {
    if (!catalog.has(id)) continue;
    while (cards.length < MAX_DECK_SIZE && cards.filter(value => value === id).length < 3) cards.push(id);
    if (cards.length === MAX_DECK_SIZE) break;
  }
  return { version: 1, selectedId: "starter", decks: [{ id: "starter", name: "기본 훈련 덱", cards }] };
}

function clean(raw) {
  if (raw?.version !== 1 || !Array.isArray(raw.decks)) throw new Error("지원하지 않는 덱 저장 형식");
  const seen = new Set();
  const decks = raw.decks.filter(deck => {
    if (!deck || typeof deck.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(deck.id) || seen.has(deck.id) || typeof deck.name !== "string" || validateDeck(deck.cards, { allowIncomplete: true }).length) return false;
    seen.add(deck.id);return true;
  }).map(deck => ({ id: deck.id, name: deck.name.trim().slice(0, 32) || "이름 없는 덱", cards: [...deck.cards] }));
  return { version: 1, decks, selectedId: decks.some(deck => deck.id === raw.selectedId && !validateDeck(deck.cards).length) ? raw.selectedId : null };
}
export function loadDecks() {
  if (!memory) {
    try { const stored = localStorage.getItem(KEY); memory = stored ? clean(JSON.parse(stored)) : initial(); }
    catch { storageAvailable = false; memory = initial(); }
  }
  return structuredClone(memory);
}
function persist(state) {
  memory = clean(state);
  try { localStorage.setItem(KEY, JSON.stringify(memory)); storageAvailable = true; }
  catch { storageAvailable = false; }
  return { persistent: storageAvailable };
}
export function getInventory() { return { ...owned }; }
export function saveDeck(id, name, cards) {
  const errors = validateDeck(cards, { allowIncomplete: true });
  if (errors.length) throw new Error(errors.join(" / "));
  if (!name.trim()) throw new Error("덱 이름을 입력하세요.");
  const state = loadDecks();
  if (id && !state.decks.some(deck => deck.id === id)) throw new Error("수정할 덱이 없습니다.");
  const deck = { id: id || `deck-${crypto.randomUUID()}`, name: name.trim().slice(0, 32), cards: [...cards] };
  const index = state.decks.findIndex(item => item.id === deck.id);
  if (index < 0) state.decks.push(deck); else state.decks[index] = deck;
  return { ...persist(state), id: deck.id };
}
export function deleteDeck(id) {
  const state = loadDecks();
  state.decks = state.decks.filter(deck => deck.id !== id);
  if (state.selectedId === id) state.selectedId = null;
  return persist(state);
}
export function selectDeck(id) {
  const state = loadDecks();
  const deck = state.decks.find(deck => deck.id === id);
  if (!deck) throw new Error("선택할 덱이 없습니다.");
  const errors = validateDeck(deck.cards);
  if (errors.length) throw new Error(errors.join(" / "));
  state.selectedId = id;
  return persist(state);
}
export function getSelectedDeck() {
  const state = loadDecks();
  return state.decks.find(deck => deck.id === state.selectedId && !validateDeck(deck.cards).length) || null;
}
export function isStorageAvailable() { loadDecks();return storageAvailable; }
