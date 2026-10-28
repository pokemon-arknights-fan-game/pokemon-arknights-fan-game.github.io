# 공통 화면 틀과 화면 로더

index.html에는 공통 전체 화면 버튼과 game-screen 자리만 둡니다. 실제 로비·전투 HTML은 src/screens/lobby.html과 battle.html에 있습니다. iframe·postMessage는 사용하지 않습니다.

shell.js가 #lobby 또는 #battle을 읽고 고정된 파일을 fetch합니다. response.ok를 검사하고, 성공한 HTML 조각을 삽입한 뒤 해당 화면 모듈의 mount()를 호출합니다. 모듈은 정리 함수를 반환하며 다음 이동 전에 실행합니다. 문서 자체를 교체하지 않아 전체 화면은 유지됩니다.

## 실행

프로젝트 루트에서 `python -m http.server 8000 --bind 127.0.0.1`을 실행한 뒤 http://localhost:8000 에 접속합니다. Ctrl+C로 종료합니다. file:// 직접 열기는 ES 모듈과 fetch 제약 때문에 지원하지 않으며 안내 메시지를 표시합니다. GitHub Pages에는 정적 파일만 배포하면 됩니다. 별도 백엔드나 빌드는 필요하지 않습니다.

파일 URL은 new URL(..., import.meta.url)로 생성하므로 프로젝트 하위 경로 배포에도 대응합니다. 해시 이동은 실제 문서 경로를 바꾸지 않아 새로고침에도 index.html을 사용합니다.

## 안전성과 비동기 전환

- 해시는 허용된 이름만 선택하며 임의 URL이나 HTML로 해석하지 않습니다.
- HTML 삽입은 저장소의 고정된 화면 조각만 대상으로 합니다. 외부 데이터·사용자 입력에 이 방식을 사용하지 않습니다.
- 이전 요청을 AbortController로 취소하고 요청 번호도 확인해 늦은 응답이 새 화면을 덮지 못하게 합니다.
- 오류는 문구와 재시도·로비 링크로 표시합니다.
- 화면 정리는 이벤트 signal 취소, 전투 프레임 취소, 포인터 해제, 도움말 닫기, 관찰자 disconnect를 포함합니다. 로비에서는 전투가 생성되지 않습니다.

현재 스타일은 현재 화면의 CSS만 활성화합니다. 루트 lobby.html·battle.html은 기존 주소의 호환 리다이렉트이며 실제 내용은 src/screens에 있습니다.

## 새 화면 추가

src/screens에 section 조각을 만들고 src/scripts/screens에 mount()와 정리 함수를 추가합니다. shell.js의 screens에 파일 URL·표시 이름·mount를 등록하고 #화면이름 링크를 추가합니다. 스타일 활성화도 등록합니다. HTML 조각의 이미지·일반 상대 링크는 최종 문서 index.html 기준임에 주의하세요.

화면 교체는 [전체 화면 전환 효과](screen-transition.md)로 가립니다. 준비 완료 후 덮개가 걷히며, 전환 중 입력은 차단됩니다.
