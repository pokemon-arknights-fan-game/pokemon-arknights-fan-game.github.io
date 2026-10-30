// 한 실물 카드는 덱·손패·필드·묘지 중 정확히 한 곳에만 존재합니다.
export function createBattlePiles(ids, random = Math.random) {
  const drawPile = ids.map((unitId, index) => ({ instanceId: `card-${index + 1}`, unitId }));
  const hand = [], graveyard = [], field = new Map();
  let recycleCount = 0;
  function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }
  function recycle() {
    if (drawPile.length || !graveyard.length) return;
    drawPile.push(...graveyard.splice(0).map(({ instanceId, unitId }) => ({ instanceId, unitId })));
    shuffle(drawPile); recycleCount++;
  }
  function draw() {
    recycle();
    const card = drawPile.pop() || null;
    recycle();
    return card;
  }
  function fillHand() {
    while (hand.length < 9) { const card = draw(); if (!card) break; hand.push(card); }
  }
  function useCard(instanceId, use) {
    const index = hand.findIndex(card => card.instanceId === instanceId);
    if (index < 0 || !["deploy", "skill", "recover"].includes(use)) return null;
    const [card] = hand.splice(index, 1);
    if (use === "deploy") field.set(card.instanceId, card);
    else graveyard.push({ ...card, use });
    const replacement = draw();
    if (replacement) hand.splice(Math.min(index, hand.length), 0, replacement);
    fillHand();
    return card;
  }
  function releaseField(instanceId, reason = "retreat") {
    const card = field.get(instanceId);
    if (!card) return false;
    field.delete(instanceId);
    graveyard.push({ ...card, use: reason });
    recycle(); fillHand();
    return true;
  }
  shuffle(drawPile); fillHand();
  return { drawPile, hand, graveyard, field, useCard, releaseField, get recycleCount() { return recycleCount; } };
}
