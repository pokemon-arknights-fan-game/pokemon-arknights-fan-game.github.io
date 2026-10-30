# 화면별 실행 수명

각 모듈의 mount()는 HTML을 삽입한 다음 호출하고 정리 함수를 반환합니다. 화면을 떠나기 전에 정리 함수를 실행합니다.

battle.js는 AbortController로 이벤트를 해제하고, 전투 프레임·포인터 캡처·열린 도움말을 정리하며 ResizeObserver와 MutationObserver도 disconnect합니다. 재입장하면 새로운 게임 상태를 생성합니다. lobby.js는 현재 링크만 사용하므로 정리 함수가 비어 있습니다.

decks.js는 보유 카드·덱 목록·편집·전투 선택의 각 진입점을 제공하며 화면 이벤트를 AbortController로 정리합니다. 편집 중 초안은 저장 전까지 원본과 분리합니다.
