# Pokémon × 명일방주 웹 팬게임

포켓몬과 명일방주의 시스템을 혼합한 비공식 웹 팬게임 프로젝트입니다.
현재는 기본 폴더 구조와 배포 확인용 정적 페이지만 준비되어 있습니다.

## 폴더 구조

```text
.
├── index.html       # GitHub Pages 진입 페이지
├── assets/          # 이미지, 오디오 등 정적 리소스
│   ├── images/      # 이미지 리소스
│   └── audio/       # 오디오 리소스
├── src/             # 게임 소스 코드
│   ├── scripts/     # JavaScript 코드
│   └── styles/      # CSS 스타일
├── data/            # 게임 데이터
└── docs/            # 기획 및 개발 문서
```

각 폴더의 `README.md`에 용도를 정리합니다. 게임 기능, 프레임워크, 빌드 도구는 아직 추가하지 않았습니다.

## 로컬 확인

루트의 `index.html`을 브라우저에서 열면 기본 페이지를 확인할 수 있습니다.

## GitHub Pages 배포

저장소의 **Settings → Pages → Build and deployment**에서 다음과 같이 설정합니다.

- Source: **Deploy from a branch**
- Branch: 배포할 브랜치 선택
- Folder: **/ (root)**

루트의 `index.html`을 진입점으로 사용하며 별도 빌드 과정은 없습니다.
실제 Pages 설정은 GitHub에서 별도로 진행해야 합니다.

## 프로젝트 안내

이 프로젝트는 비공식 팬 프로젝트이며 원작 권리자와 관련이 없습니다.
포켓몬 및 명일방주 관련 명칭과 원작 리소스의 권리는 각 권리자에게 있습니다.
