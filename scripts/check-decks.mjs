import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const dataUrl = code => `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
const read = path => readFile(new URL(path, import.meta.url), "utf8");
const catalogUrl = dataUrl(await read("../data/pokemon-gen1.js"));
const trainingUrl = dataUrl(await read("../data/training-deck.js"));
const storeSource = (await read("../src/scripts/deck-store.js")).replace('"../../data/pokemon-gen1.js"', JSON.stringify(catalogUrl)).replace('"../../data/training-deck.js"', JSON.stringify(trainingUrl));
globalThis.localStorage = { values: new Map(), getItem(key) { return this.values.get(key) ?? null; }, setItem(key,value) { this.values.set(key,value); } };
const { webcrypto } = await import("node:crypto");globalThis.crypto ||= webcrypto;
const store = await import(dataUrl(storeSource));
const { createBattlePiles } = await import(dataUrl(await read("../src/scripts/deck-piles.js")));
assert.equal(Object.keys(store.getInventory()).length,151);
assert(Object.values(store.getInventory()).every(count=>count===3));
assert.equal(store.loadDecks().decks[0].cards.length,40);
assert(store.validateDeck([]).length);
assert(store.validateDeck(Array(4).fill("bulbasaur")).length);
assert(store.validateDeck(["missing"]).length);
const forty=[...store.catalog.keys()].slice(0,14).flatMap(id=>[id,id,id]).slice(0,40);
assert.equal(store.validateDeck(forty).length,0);
assert(store.validateDeck(forty.slice(0,39)).length);
const draft=store.saveDeck(null,"39장 초안",forty.slice(0,39));
assert.equal(store.loadDecks().decks.find(deck=>deck.id===draft.id).cards.length,39);
assert.throws(()=>store.selectDeck(draft.id));
const draftReload=await import(dataUrl(storeSource+"\n// draft reload"));
assert.equal(draftReload.loadDecks().decks.find(deck=>deck.id===draft.id).cards.length,39);
store.saveDeck(draft.id,"빈 초안",[]);
assert.equal(store.loadDecks().decks.find(deck=>deck.id===draft.id).cards.length,0);
assert.throws(()=>store.selectDeck(draft.id));
store.saveDeck(draft.id,"완성",forty);store.selectDeck(draft.id);
store.saveDeck(draft.id,"다시 미완성",forty.slice(0,39));
assert.equal(store.getSelectedDeck(),null);
assert.throws(()=>store.saveDeck(null,"초과",[...forty,"mew"]));
assert.throws(()=>store.saveDeck(null,"종류 초과",Array(4).fill("bulbasaur")));
store.deleteDeck(draft.id);

assert(store.validateDeck([...forty,"mew"]).length);
const saved=store.saveDeck(null,"검증 덱",forty);
assert.equal(store.loadDecks().decks.length,2);
store.saveDeck(saved.id,"수정",[...forty.slice(0,39),"mew"]);store.selectDeck(saved.id);
assert.equal(store.getSelectedDeck().cards.length,40);
const copy=store.loadDecks();copy.decks[0].cards.length=0;
assert.equal(store.loadDecks().decks[0].cards.length,40);
const reloaded=await import(dataUrl(storeSource+"\n// reload"));
assert.equal(reloaded.getSelectedDeck().name,"수정");
store.deleteDeck(saved.id);assert.equal(store.getSelectedDeck(),null);
// 기존 규칙으로 저장한 짧은 덱은 삭제하지 않고 편집할 수 있게 남깁니다.
const legacyRaw={version:1,selectedId:"old",decks:[{id:"old",name:"이전 덱",cards:["bulbasaur"]}]};
localStorage.setItem("pokemon-arknights.decks.v1",JSON.stringify(legacyRaw));
const legacy=await import(dataUrl(storeSource+"\n// legacy"));
assert.equal(legacy.loadDecks().decks.length,1);
assert.equal(legacy.getSelectedDeck(),null);
assert.throws(()=>legacy.selectDeck("old"));
legacy.saveDeck("old","수정",forty);legacy.selectDeck("old");assert.equal(legacy.getSelectedDeck().cards.length,40);
const blocked=await import(dataUrl(storeSource+"\n// blocked"));
globalThis.localStorage={getItem(){throw Error("blocked");},setItem(){throw Error("blocked");}};
assert.equal(blocked.loadDecks().decks.length,1);
assert.equal(blocked.saveDeck(null,"세션",forty).persistent,false);
assert.equal(blocked.loadDecks().decks.length,2);
function conserved(piles,size) {
 const all=[...piles.drawPile,...piles.hand,...piles.graveyard,...piles.field.values()];
 assert.equal(all.length,size);assert.equal(new Set(all.map(card=>card.instanceId)).size,size);
}
for(const size of [1,3,9,18,40]) {
 const piles=createBattlePiles(Array.from({length:size},(_,i)=>`type-${i}`),()=>.4);
 assert.equal(piles.hand.length,Math.min(size,9));
 for(let i=0;i<120;i++) {
  const card=piles.hand[0];assert(card);
  assert(piles.useCard(card.instanceId,"skill"));conserved(piles,size);
 }
 assert(piles.recycleCount>0);
}
const small=createBattlePiles(["a","b","c"],()=>0);
for(const card of [...small.hand])small.useCard(card.instanceId,"deploy");
assert.equal(small.hand.length,0);assert.equal(small.graveyard.length,0);assert.equal(small.field.size,3);conserved(small,3);
const deployed=[...small.field.keys()][0];assert(small.releaseField(deployed));assert(!small.releaseField(deployed));
assert.equal(small.hand.length,1);assert.equal(small.field.size,2);conserved(small,3);
assert.equal(small.useCard("missing","skill"),null);conserved(small,3);
const big=createBattlePiles(Array(18).fill("a"),()=>.2);
const card=big.hand[0];big.useCard(card.instanceId,"deploy");
assert.equal(big.graveyard.length,0);assert(big.field.has(card.instanceId));
big.releaseField(card.instanceId,"defeated");assert.equal(big.graveyard.length,1);conserved(big,18);
console.log("PASS: ownership, fixed-40/three-copy validation, CRUD, persistence/fallback, finite draws, recycling and card conservation");

const fixed=createBattlePiles(forty,()=>.4);
assert.equal(fixed.hand.length,9);
for(let i=0;i<80;i++) { fixed.useCard(fixed.hand[0].instanceId,"skill"); assert.equal(fixed.hand.length,9); conserved(fixed,40); }
for(let i=0;i<20;i++) { fixed.useCard(fixed.hand[0].instanceId,"deploy"); assert.equal(fixed.hand.length,9); conserved(fixed,40); }
console.log("PASS: fixed nine-card hand through draws/recycling and field deployment while cards remain available");
