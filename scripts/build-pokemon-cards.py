"""고정한 151종 자료로 임시 카드 데이터를 오프라인 재생성합니다."""
from pathlib import Path
import json
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
SPECIES = json.loads((ROOT / "data/source/pokeapi/gen1-species.json").read_text(encoding="utf-8"))
BY_DEX = {row["dexNumber"]: row for row in SPECIES}
QUOTAS = {"bronze": 61, "silver": 45, "gold": 30, "legendary": 15}
RARITIES = list(QUOTAS)
CHILDREN = {n: [] for n in BY_DEX}
for row in SPECIES:
    if row["evolvesFromDex"]:
        CHILDREN[row["evolvesFromDex"]].append(row["dexNumber"])

def depth(number):
    parent = BY_DEX[number]["evolvesFromDex"]
    return 0 if parent is None else depth(parent) + 1

def score(number):
    row = BY_DEX[number]
    return (int(row["isLegendary"] or row["isMythical"]), sum(row["baseStats"].values()), -number)

# 최소 등급은 진화 깊이입니다. 자식 등급보다 낮게만 승급해 순서를 유지합니다.
ranks = {n: depth(n) for n in BY_DEX}
for tier in [3, 2, 1]:
    candidates = sorted(BY_DEX, key=score, reverse=True)
    for number in candidates:
        if sum(rank == tier for rank in ranks.values()) >= QUOTAS[RARITIES[tier]]:
            break
        if ranks[number] < tier and all(ranks[child] > tier for child in CHILDREN[number]):
            ranks[number] = tier
assert Counter(RARITIES[rank] for rank in ranks.values()) == Counter(QUOTAS)
assert all(ranks[row["evolvesFromDex"]] < ranks[row["dexNumber"]] for row in SPECIES if row["evolvesFromDex"])
assert all(ranks[row["dexNumber"]] == 3 for row in SPECIES if row["isLegendary"] or row["isMythical"])

COLORS = {"normal":"#b9bdaf", "fire":"#f2ac82", "water":"#8ecfe9", "grass":"#9cd6a1", "electric":"#f2d474", "ice":"#9cdedb", "fighting":"#dba18c", "poison":"#c29bd7", "ground":"#dfc696", "flying":"#b6c7ee", "psychic":"#eda2bd", "bug":"#c2d78b", "rock":"#cbbd96", "ghost":"#b0a0db", "dragon":"#b1b1ee", "fairy":"#eeb7dd", "steel":"#c2ced4", "dark":"#aa9a99"}
TYPE_NAMES = {"normal":"노말", "fire":"불꽃", "water":"물", "grass":"풀", "electric":"전기", "ice":"얼음", "fighting":"격투", "poison":"독", "ground":"땅", "flying":"비행", "psychic":"에스퍼", "bug":"벌레", "rock":"바위", "ghost":"고스트", "dragon":"드래곤", "fairy":"페어리", "steel":"강철", "dark":"악"}
# 기존 여섯 카드의 수치·역할·스킬은 유지합니다.
OVERRIDES = {
 "bulbasaur": dict(dpCost=3, terrain="ground", blockCount=2, attack=3, maxHp=16, attackInterval=1, rangeId="melee", skill=dict(name="생명의 빛",effect="heal",amount=3)),
 "charmander": dict(dpCost=4, terrain="ground", blockCount=0, attack=4, maxHp=10, attackInterval=1, rangeId="flame", skill=dict(name="불꽃 파동",effect="damage",amount=4)),
 "sandshrew": dict(dpCost=3, terrain="ground", blockCount=1, attack=2, maxHp=18, attackInterval=.8, rangeId="melee", skill=dict(name="모래 파동",effect="damage",amount=3)),
 "snorlax": dict(dpCost=6, terrain="ground", blockCount=3, attack=4, maxHp=26, attackInterval=1.4, rangeId="melee", skill=dict(name="응원",effect="buff",amount=1,duration=5)),
 "pikachu": dict(dpCost=5, terrain="hill", blockCount=0, attack=4, maxHp=10, attackInterval=1, rangeId="ranged", skill=dict(name="전기 파동",effect="damage",amount=4)),
 "squirtle": dict(dpCost=4, terrain="hill", blockCount=0, attack=3, maxHp=14, attackInterval=1.1, rangeId="ranged", skill=dict(name="회복의 물결",effect="heal",amount=4)),
}
cards = []
for source in SPECIES:
    number = source["dexNumber"]
    rank = ranks[number]
    stats = source["baseStats"]
    types = source["types"]
    hill = bool(set(types) & {"flying", "psychic", "electric", "ice", "ghost"}) or ("water" in types and stats["specialAttack"] > stats["attack"])
    terrain = "hill" if hill else "ground"
    block = 0 if hill or "fire" in types else 3 if stats["defense"] >= 110 or stats["hp"] >= 120 else 2 if stats["defense"] >= 70 else 1
    attack = min(8, 2 + max(stats["attack"], stats["specialAttack"]) // 35 + rank)
    hp = 10 + stats["hp"] // 10 + stats["defense"] // 12 + rank * 2
    effect = "heal" if "grass" in types or "fairy" in types else "buff" if types[0] == "normal" else "damage"
    amount = 1 if effect == "buff" else min(7, 3 + rank)
    skill = dict(name="임시 응원" if effect == "buff" else "임시 회복" if effect == "heal" else TYPE_NAMES[types[0]] + " 파동", effect=effect, amount=amount)
    if effect == "buff": skill["duration"] = 5
    card = dict(id=source["id"], dexNumber=number, name=source["name"], mark=source["name"][0], types=types, rarity=RARITIES[rank], evolvesFrom=BY_DEX[source["evolvesFromDex"]]["id"] if source["evolvesFromDex"] else None, evolvesTo=[BY_DEX[n]["id"] for n in CHILDREN[number]], evolutionStage=depth(number), dpCost=min(12, 2 + rank + attack // 2 + block // 2 + int(hill)), terrain=terrain, blockCount=block, attack=attack, maxHp=hp, attackInterval=.8 if stats["speed"] >= 100 else 1 if stats["speed"] >= 60 else 1.2, rangeId="ranged" if hill else "flame" if "fire" in types else "melee", color=COLORS[types[0]], skill=skill)
    card.update(OVERRIDES.get(card["id"], {}))
    card["role"] = "언덕형" if card["terrain"] == "hill" else "지상형"
    card["skill"].update(ppCost=1, area="square-3x3")
    cards.append(card)

output = "// 생성 파일: python scripts/build-pokemon-cards.py / 원본·밸런스 기준은 docs/pokemon-cards.md 참고\n"
output += "export const rarityRules = " + json.dumps({"order":RARITIES,"labels":{"bronze":"브론즈","silver":"실버","gold":"골드","legendary":"레전드"},"counts":QUOTAS,"targetRatios":{"bronze":.4,"silver":.3,"gold":.2,"legendary":.1}}, ensure_ascii=False, indent=2) + ";\n\n"
output += "export const pokemonCards = " + json.dumps(cards, ensure_ascii=False, indent=2) + ";\n"
(ROOT / "data/pokemon-gen1.js").write_text(output, encoding="utf-8")
print(f"Generated {len(cards)} cards: {dict(Counter(card['rarity'] for card in cards))}")
