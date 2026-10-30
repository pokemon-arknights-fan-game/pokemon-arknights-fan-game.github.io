# 데이터 도구

프로젝트 루트에서 `python scripts/build-pokemon-cards.py`로 고정된 원본 요약에서 카드 데이터를 재생성합니다. 인터넷·추가 패키지가 필요하지 않습니다.

`node scripts/check-pokemon-cards.mjs`로 151종 누락·중복, 진화 등급 순서, 등급 수량, 전투 필드와 훈련 덱 참조를 검사합니다. Node.js 18 이상을 사용하세요.

`node scripts/check-decks.mjs`는 편성 제한·저장과 유한 카드 영역 이동을 검증합니다.
