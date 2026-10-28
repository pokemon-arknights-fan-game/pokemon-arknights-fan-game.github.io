// 생성 파일: python scripts/build-pokemon-cards.py / 원본·밸런스 기준은 docs/pokemon-cards.md 참고
export const rarityRules = {
  "order": [
    "bronze",
    "silver",
    "gold",
    "legendary"
  ],
  "labels": {
    "bronze": "브론즈",
    "silver": "실버",
    "gold": "골드",
    "legendary": "레전드"
  },
  "counts": {
    "bronze": 61,
    "silver": 45,
    "gold": 30,
    "legendary": 15
  },
  "targetRatios": {
    "bronze": 0.4,
    "silver": 0.3,
    "gold": 0.2,
    "legendary": 0.1
  }
};

export const pokemonCards = [
  {
    "id": "bulbasaur",
    "dexNumber": 1,
    "name": "이상해씨",
    "mark": "이",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "ivysaur"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "생명의 빛",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "ivysaur",
    "dexNumber": 2,
    "name": "이상해풀",
    "mark": "이",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "bulbasaur",
    "evolvesTo": [
      "venusaur"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "venusaur",
    "dexNumber": 3,
    "name": "이상해꽃",
    "mark": "이",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "legendary",
    "evolvesFrom": "ivysaur",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 9,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 30,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "charmander",
    "dexNumber": 4,
    "name": "파이리",
    "mark": "파",
    "types": [
      "fire"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "charmeleon"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 10,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "charmeleon",
    "dexNumber": 5,
    "name": "리자드",
    "mark": "리",
    "types": [
      "fire"
    ],
    "rarity": "silver",
    "evolvesFrom": "charmander",
    "evolvesTo": [
      "charizard"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 21,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "charizard",
    "dexNumber": 6,
    "name": "리자몽",
    "mark": "리",
    "types": [
      "fire",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": "charmeleon",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 29,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "squirtle",
    "dexNumber": 7,
    "name": "꼬부기",
    "mark": "꼬",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "wartortle"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 14,
    "attackInterval": 1.1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "회복의 물결",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "wartortle",
    "dexNumber": 8,
    "name": "어니부기",
    "mark": "어",
    "types": [
      "water"
    ],
    "rarity": "silver",
    "evolvesFrom": "squirtle",
    "evolvesTo": [
      "blastoise"
    ],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 23,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "blastoise",
    "dexNumber": 9,
    "name": "거북왕",
    "mark": "거",
    "types": [
      "water"
    ],
    "rarity": "legendary",
    "evolvesFrom": "wartortle",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 9,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 31,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "caterpie",
    "dexNumber": 10,
    "name": "캐터피",
    "mark": "캐",
    "types": [
      "bug"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "metapod"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 2,
    "maxHp": 16,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "metapod",
    "dexNumber": 11,
    "name": "단데기",
    "mark": "단",
    "types": [
      "bug"
    ],
    "rarity": "silver",
    "evolvesFrom": "caterpie",
    "evolvesTo": [
      "butterfree"
    ],
    "evolutionStage": 1,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "butterfree",
    "dexNumber": 12,
    "name": "버터플",
    "mark": "버",
    "types": [
      "bug",
      "flying"
    ],
    "rarity": "gold",
    "evolvesFrom": "metapod",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "weedle",
    "dexNumber": 13,
    "name": "뿔충이",
    "mark": "뿔",
    "types": [
      "bug",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "kakuna"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "kakuna",
    "dexNumber": 14,
    "name": "딱충이",
    "mark": "딱",
    "types": [
      "bug",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "weedle",
    "evolvesTo": [
      "beedrill"
    ],
    "evolutionStage": 1,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 20,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "beedrill",
    "dexNumber": 15,
    "name": "독침붕",
    "mark": "독",
    "types": [
      "bug",
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "kakuna",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 6,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "pidgey",
    "dexNumber": 16,
    "name": "구구",
    "mark": "구",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "pidgeotto"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "pidgeotto",
    "dexNumber": 17,
    "name": "피죤",
    "mark": "피",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "silver",
    "evolvesFrom": "pidgey",
    "evolvesTo": [
      "pidgeot"
    ],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 22,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "pidgeot",
    "dexNumber": 18,
    "name": "피죤투",
    "mark": "피",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "gold",
    "evolvesFrom": "pidgeotto",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 28,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "rattata",
    "dexNumber": 19,
    "name": "꼬렛",
    "mark": "꼬",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "raticate"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 15,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "raticate",
    "dexNumber": 20,
    "name": "레트라",
    "mark": "레",
    "types": [
      "normal"
    ],
    "rarity": "silver",
    "evolvesFrom": "rattata",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 22,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "spearow",
    "dexNumber": 21,
    "name": "깨비참",
    "mark": "깨",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "fearow"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "fearow",
    "dexNumber": 22,
    "name": "깨비드릴조",
    "mark": "깨",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "silver",
    "evolvesFrom": "spearow",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "ekans",
    "dexNumber": 23,
    "name": "아보",
    "mark": "아",
    "types": [
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "arbok"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "arbok",
    "dexNumber": 24,
    "name": "아보크",
    "mark": "아",
    "types": [
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "ekans",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "pikachu",
    "dexNumber": 25,
    "name": "피카츄",
    "mark": "피",
    "types": [
      "electric"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "raichu"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 10,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "raichu",
    "dexNumber": 26,
    "name": "라이츄",
    "mark": "라",
    "types": [
      "electric"
    ],
    "rarity": "silver",
    "evolvesFrom": "pikachu",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 22,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "sandshrew",
    "dexNumber": 27,
    "name": "모래두지",
    "mark": "모",
    "types": [
      "ground"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "sandslash"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 2,
    "maxHp": 18,
    "attackInterval": 0.8,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "모래 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "sandslash",
    "dexNumber": 28,
    "name": "고지",
    "mark": "고",
    "types": [
      "ground"
    ],
    "rarity": "silver",
    "evolvesFrom": "sandshrew",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 5,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidoran-f",
    "dexNumber": 29,
    "name": "니드런♀",
    "mark": "니",
    "types": [
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "nidorina"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 19,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidorina",
    "dexNumber": 30,
    "name": "니드리나",
    "mark": "니",
    "types": [
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "nidoran-f",
    "evolvesTo": [
      "nidoqueen"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 24,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidoqueen",
    "dexNumber": 31,
    "name": "니드퀸",
    "mark": "니",
    "types": [
      "poison",
      "ground"
    ],
    "rarity": "gold",
    "evolvesFrom": "nidorina",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 6,
    "maxHp": 30,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidoran-m",
    "dexNumber": 32,
    "name": "니드런♂",
    "mark": "니",
    "types": [
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "nidorino"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidorino",
    "dexNumber": 33,
    "name": "니드리노",
    "mark": "니",
    "types": [
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "nidoran-m",
    "evolvesTo": [
      "nidoking"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 22,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "nidoking",
    "dexNumber": 34,
    "name": "니드킹",
    "mark": "니",
    "types": [
      "poison",
      "ground"
    ],
    "rarity": "gold",
    "evolvesFrom": "nidorino",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 6,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "clefairy",
    "dexNumber": 35,
    "name": "삐삐",
    "mark": "삐",
    "types": [
      "fairy"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "clefable"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#eeb7dd",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "clefable",
    "dexNumber": 36,
    "name": "픽시",
    "mark": "픽",
    "types": [
      "fairy"
    ],
    "rarity": "silver",
    "evolvesFrom": "clefairy",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 27,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#eeb7dd",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "vulpix",
    "dexNumber": 37,
    "name": "식스테일",
    "mark": "식",
    "types": [
      "fire"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "ninetales"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "ninetales",
    "dexNumber": 38,
    "name": "나인테일",
    "mark": "나",
    "types": [
      "fire"
    ],
    "rarity": "gold",
    "evolvesFrom": "vulpix",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 27,
    "attackInterval": 0.8,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "jigglypuff",
    "dexNumber": 39,
    "name": "푸린",
    "mark": "푸",
    "types": [
      "normal",
      "fairy"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "wigglytuff"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "wigglytuff",
    "dexNumber": 40,
    "name": "푸크린",
    "mark": "푸",
    "types": [
      "normal",
      "fairy"
    ],
    "rarity": "silver",
    "evolvesFrom": "jigglypuff",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 5,
    "maxHp": 29,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "zubat",
    "dexNumber": 41,
    "name": "주뱃",
    "mark": "주",
    "types": [
      "poison",
      "flying"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "golbat"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "golbat",
    "dexNumber": 42,
    "name": "골뱃",
    "mark": "골",
    "types": [
      "poison",
      "flying"
    ],
    "rarity": "silver",
    "evolvesFrom": "zubat",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "oddish",
    "dexNumber": 43,
    "name": "뚜벅쵸",
    "mark": "뚜",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "gloom"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 18,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "gloom",
    "dexNumber": 44,
    "name": "냄새꼬",
    "mark": "냄",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "oddish",
    "evolvesTo": [
      "vileplume"
    ],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "vileplume",
    "dexNumber": 45,
    "name": "라플레시아",
    "mark": "라",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "gloom",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 28,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "paras",
    "dexNumber": 46,
    "name": "파라스",
    "mark": "파",
    "types": [
      "bug",
      "grass"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "parasect"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "parasect",
    "dexNumber": 47,
    "name": "파라섹트",
    "mark": "파",
    "types": [
      "bug",
      "grass"
    ],
    "rarity": "silver",
    "evolvesFrom": "paras",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 24,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "venonat",
    "dexNumber": 48,
    "name": "콘팡",
    "mark": "콘",
    "types": [
      "bug",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "venomoth"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 20,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "venomoth",
    "dexNumber": 49,
    "name": "도나리",
    "mark": "도",
    "types": [
      "bug",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "venonat",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "diglett",
    "dexNumber": 50,
    "name": "디그다",
    "mark": "디",
    "types": [
      "ground"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "dugtrio"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 13,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "dugtrio",
    "dexNumber": 51,
    "name": "닥트리오",
    "mark": "닥",
    "types": [
      "ground"
    ],
    "rarity": "silver",
    "evolvesFrom": "diglett",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 19,
    "attackInterval": 0.8,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "meowth",
    "dexNumber": 52,
    "name": "나옹",
    "mark": "나",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "persian"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "persian",
    "dexNumber": 53,
    "name": "페르시온",
    "mark": "페",
    "types": [
      "normal"
    ],
    "rarity": "silver",
    "evolvesFrom": "meowth",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 0.8,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "psyduck",
    "dexNumber": 54,
    "name": "고라파덕",
    "mark": "고",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "golduck"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 19,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "golduck",
    "dexNumber": 55,
    "name": "골덕",
    "mark": "골",
    "types": [
      "water"
    ],
    "rarity": "gold",
    "evolvesFrom": "psyduck",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "mankey",
    "dexNumber": 56,
    "name": "망키",
    "mark": "망",
    "types": [
      "fighting"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "primeape"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "primeape",
    "dexNumber": 57,
    "name": "성원숭",
    "mark": "성",
    "types": [
      "fighting"
    ],
    "rarity": "silver",
    "evolvesFrom": "mankey",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 6,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "growlithe",
    "dexNumber": 58,
    "name": "가디",
    "mark": "가",
    "types": [
      "fire"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "arcanine"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 18,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "arcanine",
    "dexNumber": 59,
    "name": "윈디",
    "mark": "윈",
    "types": [
      "fire"
    ],
    "rarity": "legendary",
    "evolvesFrom": "growlithe",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 9,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 31,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "poliwag",
    "dexNumber": 60,
    "name": "발챙이",
    "mark": "발",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "poliwhirl"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 17,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "poliwhirl",
    "dexNumber": 61,
    "name": "슈륙챙이",
    "mark": "슈",
    "types": [
      "water"
    ],
    "rarity": "silver",
    "evolvesFrom": "poliwag",
    "evolvesTo": [
      "poliwrath"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "poliwrath",
    "dexNumber": 62,
    "name": "강챙이",
    "mark": "강",
    "types": [
      "water",
      "fighting"
    ],
    "rarity": "gold",
    "evolvesFrom": "poliwhirl",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 6,
    "maxHp": 30,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "abra",
    "dexNumber": 63,
    "name": "캐이시",
    "mark": "캐",
    "types": [
      "psychic"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "kadabra"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 13,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "kadabra",
    "dexNumber": 64,
    "name": "윤겔라",
    "mark": "윤",
    "types": [
      "psychic"
    ],
    "rarity": "silver",
    "evolvesFrom": "abra",
    "evolvesTo": [
      "alakazam"
    ],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 18,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "alakazam",
    "dexNumber": 65,
    "name": "후딘",
    "mark": "후",
    "types": [
      "psychic"
    ],
    "rarity": "gold",
    "evolvesFrom": "kadabra",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 22,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "machop",
    "dexNumber": 66,
    "name": "알통몬",
    "mark": "알",
    "types": [
      "fighting"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "machoke"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "machoke",
    "dexNumber": 67,
    "name": "근육몬",
    "mark": "근",
    "types": [
      "fighting"
    ],
    "rarity": "silver",
    "evolvesFrom": "machop",
    "evolvesTo": [
      "machamp"
    ],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 25,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "machamp",
    "dexNumber": 68,
    "name": "괴력몬",
    "mark": "괴",
    "types": [
      "fighting"
    ],
    "rarity": "gold",
    "evolvesFrom": "machoke",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 29,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "bellsprout",
    "dexNumber": 69,
    "name": "모다피",
    "mark": "모",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "weepinbell"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "weepinbell",
    "dexNumber": 70,
    "name": "우츠동",
    "mark": "우",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "bellsprout",
    "evolvesTo": [
      "victreebel"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "victreebel",
    "dexNumber": 71,
    "name": "우츠보트",
    "mark": "우",
    "types": [
      "grass",
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "weepinbell",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 7,
    "maxHp": 27,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "tentacool",
    "dexNumber": 72,
    "name": "왕눈해",
    "mark": "왕",
    "types": [
      "water",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "tentacruel"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "tentacruel",
    "dexNumber": 73,
    "name": "독파리",
    "mark": "독",
    "types": [
      "water",
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "tentacool",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 27,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "geodude",
    "dexNumber": 74,
    "name": "꼬마돌",
    "mark": "꼬",
    "types": [
      "rock",
      "ground"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "graveler"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 4,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "graveler",
    "dexNumber": 75,
    "name": "데구리",
    "mark": "데",
    "types": [
      "rock",
      "ground"
    ],
    "rarity": "silver",
    "evolvesFrom": "geodude",
    "evolvesTo": [
      "golem"
    ],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 5,
    "maxHp": 26,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "golem",
    "dexNumber": 76,
    "name": "딱구리",
    "mark": "딱",
    "types": [
      "rock",
      "ground"
    ],
    "rarity": "gold",
    "evolvesFrom": "graveler",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 7,
    "maxHp": 32,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "ponyta",
    "dexNumber": 77,
    "name": "포니타",
    "mark": "포",
    "types": [
      "fire"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "rapidash"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 19,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "rapidash",
    "dexNumber": 78,
    "name": "날쌩마",
    "mark": "날",
    "types": [
      "fire"
    ],
    "rarity": "gold",
    "evolvesFrom": "ponyta",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 25,
    "attackInterval": 0.8,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "slowpoke",
    "dexNumber": 79,
    "name": "야돈",
    "mark": "야",
    "types": [
      "water",
      "psychic"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "slowbro"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 24,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "slowbro",
    "dexNumber": 80,
    "name": "야도란",
    "mark": "야",
    "types": [
      "water",
      "psychic"
    ],
    "rarity": "gold",
    "evolvesFrom": "slowpoke",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 32,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "magnemite",
    "dexNumber": 81,
    "name": "코일",
    "mark": "코",
    "types": [
      "electric",
      "steel"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "magneton"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "magneton",
    "dexNumber": 82,
    "name": "레어코일",
    "mark": "레",
    "types": [
      "electric",
      "steel"
    ],
    "rarity": "silver",
    "evolvesFrom": "magnemite",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "farfetchd",
    "dexNumber": 83,
    "name": "파오리",
    "mark": "파",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 19,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "doduo",
    "dexNumber": 84,
    "name": "두두",
    "mark": "두",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "dodrio"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "dodrio",
    "dexNumber": 85,
    "name": "두트리오",
    "mark": "두",
    "types": [
      "normal",
      "flying"
    ],
    "rarity": "silver",
    "evolvesFrom": "doduo",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 23,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "seel",
    "dexNumber": 86,
    "name": "쥬쥬",
    "mark": "쥬",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "dewgong"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 20,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "dewgong",
    "dexNumber": 87,
    "name": "쥬레곤",
    "mark": "쥬",
    "types": [
      "water",
      "ice"
    ],
    "rarity": "silver",
    "evolvesFrom": "seel",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 27,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "grimer",
    "dexNumber": 88,
    "name": "질퍽이",
    "mark": "질",
    "types": [
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "muk"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 4,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "muk",
    "dexNumber": 89,
    "name": "질뻐기",
    "mark": "질",
    "types": [
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "grimer",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 30,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "shellder",
    "dexNumber": 90,
    "name": "셀러",
    "mark": "셀",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "cloyster"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 3,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "cloyster",
    "dexNumber": 91,
    "name": "파르셀",
    "mark": "파",
    "types": [
      "water",
      "ice"
    ],
    "rarity": "legendary",
    "evolvesFrom": "shellder",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 9,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 36,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "gastly",
    "dexNumber": 92,
    "name": "고오스",
    "mark": "고",
    "types": [
      "ghost",
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "haunter"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 15,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b0a0db",
    "skill": {
      "name": "고스트 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "haunter",
    "dexNumber": 93,
    "name": "고우스트",
    "mark": "고",
    "types": [
      "ghost",
      "poison"
    ],
    "rarity": "silver",
    "evolvesFrom": "gastly",
    "evolvesTo": [
      "gengar"
    ],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 19,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b0a0db",
    "skill": {
      "name": "고스트 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "gengar",
    "dexNumber": 94,
    "name": "팬텀",
    "mark": "팬",
    "types": [
      "ghost",
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "haunter",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 25,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#b0a0db",
    "skill": {
      "name": "고스트 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "onix",
    "dexNumber": 95,
    "name": "롱스톤",
    "mark": "롱",
    "types": [
      "rock",
      "ground"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 3,
    "maxHp": 26,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "drowzee",
    "dexNumber": 96,
    "name": "슬리프",
    "mark": "슬",
    "types": [
      "psychic"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "hypno"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 19,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "hypno",
    "dexNumber": 97,
    "name": "슬리퍼",
    "mark": "슬",
    "types": [
      "psychic"
    ],
    "rarity": "silver",
    "evolvesFrom": "drowzee",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 25,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "krabby",
    "dexNumber": 98,
    "name": "크랩",
    "mark": "크",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "kingler"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 20,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "kingler",
    "dexNumber": 99,
    "name": "킹크랩",
    "mark": "킹",
    "types": [
      "water"
    ],
    "rarity": "silver",
    "evolvesFrom": "krabby",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 6,
    "maxHp": 26,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "voltorb",
    "dexNumber": 100,
    "name": "찌리리공",
    "mark": "찌",
    "types": [
      "electric"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "electrode"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 18,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "electrode",
    "dexNumber": 101,
    "name": "붐볼",
    "mark": "붐",
    "types": [
      "electric"
    ],
    "rarity": "gold",
    "evolvesFrom": "voltorb",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 25,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "exeggcute",
    "dexNumber": 102,
    "name": "아라리",
    "mark": "아",
    "types": [
      "grass",
      "psychic"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "exeggutor"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 3,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "exeggutor",
    "dexNumber": 103,
    "name": "나시",
    "mark": "나",
    "types": [
      "grass",
      "psychic"
    ],
    "rarity": "legendary",
    "evolvesFrom": "exeggcute",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 32,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "cubone",
    "dexNumber": 104,
    "name": "탕구리",
    "mark": "탕",
    "types": [
      "ground"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "marowak"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 3,
    "maxHp": 22,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "marowak",
    "dexNumber": 105,
    "name": "텅구리",
    "mark": "텅",
    "types": [
      "ground"
    ],
    "rarity": "silver",
    "evolvesFrom": "cubone",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 5,
    "maxHp": 27,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "hitmonlee",
    "dexNumber": 106,
    "name": "시라소몬",
    "mark": "시",
    "types": [
      "fighting"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 6,
    "maxHp": 21,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "hitmonchan",
    "dexNumber": 107,
    "name": "홍수몬",
    "mark": "홍",
    "types": [
      "fighting"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 6,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#dba18c",
    "skill": {
      "name": "격투 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "lickitung",
    "dexNumber": 108,
    "name": "내루미",
    "mark": "내",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 3,
    "maxHp": 25,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "koffing",
    "dexNumber": 109,
    "name": "또가스",
    "mark": "또",
    "types": [
      "poison"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "weezing"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 3,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "weezing",
    "dexNumber": 110,
    "name": "또도가스",
    "mark": "또",
    "types": [
      "poison"
    ],
    "rarity": "gold",
    "evolvesFrom": "koffing",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 6,
    "maxHp": 30,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c29bd7",
    "skill": {
      "name": "독 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "rhyhorn",
    "dexNumber": 111,
    "name": "뿔카노",
    "mark": "뿔",
    "types": [
      "ground",
      "rock"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "rhydon"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 4,
    "maxHp": 25,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "rhydon",
    "dexNumber": 112,
    "name": "코뿌리",
    "mark": "코",
    "types": [
      "ground",
      "rock"
    ],
    "rarity": "silver",
    "evolvesFrom": "rhyhorn",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 6,
    "maxHp": 32,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#dfc696",
    "skill": {
      "name": "땅 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "chansey",
    "dexNumber": 113,
    "name": "럭키",
    "mark": "럭",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 3,
    "maxHp": 35,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "tangela",
    "dexNumber": 114,
    "name": "덩쿠리",
    "mark": "덩",
    "types": [
      "grass"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 4,
    "maxHp": 25,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#9cd6a1",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "kangaskhan",
    "dexNumber": 115,
    "name": "캥카",
    "mark": "캥",
    "types": [
      "normal"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "horsea",
    "dexNumber": 116,
    "name": "쏘드라",
    "mark": "쏘",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "seadra"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 18,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "seadra",
    "dexNumber": 117,
    "name": "시드라",
    "mark": "시",
    "types": [
      "water"
    ],
    "rarity": "silver",
    "evolvesFrom": "horsea",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "goldeen",
    "dexNumber": 118,
    "name": "콘치",
    "mark": "콘",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "seaking"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 19,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "seaking",
    "dexNumber": 119,
    "name": "왕콘치",
    "mark": "왕",
    "types": [
      "water"
    ],
    "rarity": "silver",
    "evolvesFrom": "goldeen",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 25,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "staryu",
    "dexNumber": 120,
    "name": "별가사리",
    "mark": "별",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "starmie"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 17,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "starmie",
    "dexNumber": 121,
    "name": "아쿠스타",
    "mark": "아",
    "types": [
      "water",
      "psychic"
    ],
    "rarity": "gold",
    "evolvesFrom": "staryu",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 27,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "mr-mime",
    "dexNumber": 122,
    "name": "마임맨",
    "mark": "마",
    "types": [
      "psychic",
      "fairy"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 21,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "임시 회복",
      "effect": "heal",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "scyther",
    "dexNumber": 123,
    "name": "스라크",
    "mark": "스",
    "types": [
      "bug",
      "flying"
    ],
    "rarity": "gold",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 27,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "jynx",
    "dexNumber": 124,
    "name": "루주라",
    "mark": "루",
    "types": [
      "ice",
      "psychic"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 7,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 20,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#9cdedb",
    "skill": {
      "name": "얼음 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "electabuzz",
    "dexNumber": 125,
    "name": "에레브",
    "mark": "에",
    "types": [
      "electric"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 5,
    "maxHp": 22,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "magmar",
    "dexNumber": 126,
    "name": "마그마",
    "mark": "마",
    "types": [
      "fire"
    ],
    "rarity": "gold",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 6,
    "maxHp": 24,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "pinsir",
    "dexNumber": 127,
    "name": "쁘사이저",
    "mark": "쁘",
    "types": [
      "bug"
    ],
    "rarity": "gold",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#c2d78b",
    "skill": {
      "name": "벌레 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "tauros",
    "dexNumber": 128,
    "name": "켄타로스",
    "mark": "켄",
    "types": [
      "normal"
    ],
    "rarity": "silver",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 5,
    "maxHp": 26,
    "attackInterval": 0.8,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "magikarp",
    "dexNumber": 129,
    "name": "잉어킹",
    "mark": "잉",
    "types": [
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "gyarados"
    ],
    "evolutionStage": 0,
    "dpCost": 4,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 2,
    "maxHp": 16,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "gyarados",
    "dexNumber": 130,
    "name": "갸라도스",
    "mark": "갸",
    "types": [
      "water",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": "magikarp",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 31,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "lapras",
    "dexNumber": 131,
    "name": "라프라스",
    "mark": "라",
    "types": [
      "water",
      "ice"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 9,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 35,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "ditto",
    "dexNumber": 132,
    "name": "메타몽",
    "mark": "메",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 18,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "eevee",
    "dexNumber": 133,
    "name": "이브이",
    "mark": "이",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "vaporeon",
      "jolteon",
      "flareon"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 19,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "vaporeon",
    "dexNumber": 134,
    "name": "샤미드",
    "mark": "샤",
    "types": [
      "water"
    ],
    "rarity": "gold",
    "evolvesFrom": "eevee",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 32,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#8ecfe9",
    "skill": {
      "name": "물 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "jolteon",
    "dexNumber": 135,
    "name": "쥬피썬더",
    "mark": "쥬",
    "types": [
      "electric"
    ],
    "rarity": "gold",
    "evolvesFrom": "eevee",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 25,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "flareon",
    "dexNumber": 136,
    "name": "부스터",
    "mark": "부",
    "types": [
      "fire"
    ],
    "rarity": "gold",
    "evolvesFrom": "eevee",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 7,
    "terrain": "ground",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 25,
    "attackInterval": 1,
    "rangeId": "flame",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "porygon",
    "dexNumber": 137,
    "name": "폴리곤",
    "mark": "폴",
    "types": [
      "normal"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 4,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "임시 응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "omanyte",
    "dexNumber": 138,
    "name": "암나이트",
    "mark": "암",
    "types": [
      "rock",
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "omastar"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 4,
    "maxHp": 21,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "omastar",
    "dexNumber": 139,
    "name": "암스타",
    "mark": "암",
    "types": [
      "rock",
      "water"
    ],
    "rarity": "gold",
    "evolvesFrom": "omanyte",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 31,
    "attackInterval": 1.2,
    "rangeId": "ranged",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "kabuto",
    "dexNumber": 140,
    "name": "투구",
    "mark": "투",
    "types": [
      "rock",
      "water"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "kabutops"
    ],
    "evolutionStage": 0,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 4,
    "maxHp": 20,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "kabutops",
    "dexNumber": 141,
    "name": "투구푸스",
    "mark": "투",
    "types": [
      "rock",
      "water"
    ],
    "rarity": "gold",
    "evolvesFrom": "kabuto",
    "evolvesTo": [],
    "evolutionStage": 1,
    "dpCost": 8,
    "terrain": "ground",
    "blockCount": 2,
    "attack": 7,
    "maxHp": 28,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "aerodactyl",
    "dexNumber": 142,
    "name": "프테라",
    "mark": "프",
    "types": [
      "rock",
      "flying"
    ],
    "rarity": "gold",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 8,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 27,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#cbbd96",
    "skill": {
      "name": "바위 파동",
      "effect": "damage",
      "amount": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "snorlax",
    "dexNumber": 143,
    "name": "잠만보",
    "mark": "잠",
    "types": [
      "normal"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 6,
    "terrain": "ground",
    "blockCount": 3,
    "attack": 4,
    "maxHp": 26,
    "attackInterval": 1.4,
    "rangeId": "melee",
    "color": "#b9bdaf",
    "skill": {
      "name": "응원",
      "effect": "buff",
      "amount": 1,
      "duration": 5,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "articuno",
    "dexNumber": 144,
    "name": "프리져",
    "mark": "프",
    "types": [
      "ice",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 9,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 33,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#9cdedb",
    "skill": {
      "name": "얼음 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "zapdos",
    "dexNumber": 145,
    "name": "썬더",
    "mark": "썬",
    "types": [
      "electric",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 32,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#f2d474",
    "skill": {
      "name": "전기 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "moltres",
    "dexNumber": 146,
    "name": "파이어",
    "mark": "파",
    "types": [
      "fire",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 32,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#f2ac82",
    "skill": {
      "name": "불꽃 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "dratini",
    "dexNumber": 147,
    "name": "미뇽",
    "mark": "미",
    "types": [
      "dragon"
    ],
    "rarity": "bronze",
    "evolvesFrom": null,
    "evolvesTo": [
      "dragonair"
    ],
    "evolutionStage": 0,
    "dpCost": 3,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 3,
    "maxHp": 17,
    "attackInterval": 1.2,
    "rangeId": "melee",
    "color": "#b1b1ee",
    "skill": {
      "name": "드래곤 파동",
      "effect": "damage",
      "amount": 3,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "dragonair",
    "dexNumber": 148,
    "name": "신뇽",
    "mark": "신",
    "types": [
      "dragon"
    ],
    "rarity": "silver",
    "evolvesFrom": "dratini",
    "evolvesTo": [
      "dragonite"
    ],
    "evolutionStage": 1,
    "dpCost": 5,
    "terrain": "ground",
    "blockCount": 1,
    "attack": 5,
    "maxHp": 23,
    "attackInterval": 1,
    "rangeId": "melee",
    "color": "#b1b1ee",
    "skill": {
      "name": "드래곤 파동",
      "effect": "damage",
      "amount": 4,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "지상형"
  },
  {
    "id": "dragonite",
    "dexNumber": 149,
    "name": "망나뇽",
    "mark": "망",
    "types": [
      "dragon",
      "flying"
    ],
    "rarity": "legendary",
    "evolvesFrom": "dragonair",
    "evolvesTo": [],
    "evolutionStage": 2,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 32,
    "attackInterval": 1,
    "rangeId": "ranged",
    "color": "#b1b1ee",
    "skill": {
      "name": "드래곤 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "mewtwo",
    "dexNumber": 150,
    "name": "뮤츠",
    "mark": "뮤",
    "types": [
      "psychic"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 10,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 8,
    "maxHp": 33,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  },
  {
    "id": "mew",
    "dexNumber": 151,
    "name": "뮤",
    "mark": "뮤",
    "types": [
      "psychic"
    ],
    "rarity": "legendary",
    "evolvesFrom": null,
    "evolvesTo": [],
    "evolutionStage": 0,
    "dpCost": 9,
    "terrain": "hill",
    "blockCount": 0,
    "attack": 7,
    "maxHp": 34,
    "attackInterval": 0.8,
    "rangeId": "ranged",
    "color": "#eda2bd",
    "skill": {
      "name": "에스퍼 파동",
      "effect": "damage",
      "amount": 6,
      "ppCost": 1,
      "area": "square-3x3"
    },
    "role": "언덕형"
  }
];
