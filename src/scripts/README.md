# JavaScript

게임 초기화, 전투 로직, 화면 제어 코드를 보관합니다.

- prototype.js: 전투 규칙과 상태, createBattle로 생성하고 정리 함수 반환
- card-input.js: 카드 포인터 입력
- viewport.js: 전장 크기와 도움말
- shell.js: HTML 조각 fetch·화면 수명·공통 전체 화면
- screen-redirect.js: 예전 개별 화면 주소를 index.html의 고정된 해시 주소로 연결

실제 게임 스크립트는 index.html에서 불러옵니다. iframe이나 문서 간 메시지 전달은 사용하지 않습니다.

화면별 진입점은 screens/의 mount()입니다. ES 모듈을 사용하므로 로컬에서도 HTTP 서버로 실행합니다.
