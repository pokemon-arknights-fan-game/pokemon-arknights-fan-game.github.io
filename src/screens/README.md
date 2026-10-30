# 화면 HTML

로비와 전투의 실제 마크업을 보관합니다. 완전한 HTML 문서가 아니라 index.html의 game-screen 안에 넣는 section 조각입니다. head·body·script를 추가하지 않습니다.

- lobby.html: 로비 메뉴
- battle.html: 전장, 손패, 도움말
- cards.html: 보유 카드
- decks.html: 저장된 덱 목록
- deck-editor.html: 덱 생성·수정
- deck-select.html: 전투용 덱 선택

화면 초기화와 정리는 src/scripts/screens/에서 관리합니다. 이미지·링크의 상대 경로는 조각 파일이 아니라 최종 문서 index.html을 기준으로 해석됩니다. 화면 파일 URL은 shell.js가 import.meta.url 기준으로 생성하므로 저장소 하위 경로에서도 동작합니다.

fetch는 저장소 안의 허용된 파일만 대상으로 합니다. 사용자 입력이나 외부 서버의 HTML을 화면에 삽입하지 않습니다.
