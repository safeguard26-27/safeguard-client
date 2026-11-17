# safeguard-client

실시간 소화 설비 상태 모니터링 및 스마트 안전 관제 시스템의 웹 클라이언트(PWA)입니다.
모바일 화면을 기준으로 대시보드, 장비, 이벤트, 점검, 알림 기능을 제공합니다.

## 기술 스택

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

## 시작하기

### 요구 사항

- Node.js 20 (CI와 Dockerfile 기준)
- npm

### 설치 및 실행

```bash
git clone https://github.com/safeguard26-27/safeguard-client.git
cd safeguard-client
npm ci
# 팀에서 공유받은 .env 파일을 프로젝트 루트에 둔다 (아래 환경 변수 참고)
npm run dev
```

개발 서버에서 `/api` 요청은 `VITE_API_BASE_URL`(없으면 `http://localhost:8080`)로 프록시됩니다.

### 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 체크(`tsc -b`) 후 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

## 환경 변수

`.env` 파일은 **팀 내부에서 공유**합니다. 팀원에게 받아 프로젝트 루트에 두면 됩니다.
어떤 변수가 필요한지는 `.env.example`에서 확인할 수 있습니다.

> ⚠️ 공개 레포이므로 `.env`는 **커밋하지 않습니다** (`.gitignore`에 포함).
> 레포, 이슈, PR, 스크린샷 등 공개된 곳에 값을 올리지 말고, 팀 내부 채널로만 주고받습니다.
> 또한 `VITE_` 변수는 빌드 결과물(번들)에 포함되어 배포된 사이트에서 누구나 볼 수 있으므로, **공개되어도 되는 값만** 넣습니다.
> 변수를 추가하거나 바꾸면 `.env.example`에 변수 이름을 반영하고 팀에 새 `.env`를 공유합니다.

| 변수 | 설명 |
| --- | --- |
| `VITE_API_BASE_URL` | API 게이트웨이 주소 |
| `VITE_FIREBASE_API_KEY` | Firebase 웹 API 키 |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth 도메인 |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `VITE_FIREBASE_APP_ID` | Firebase 앱 ID |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM 발신자 ID |

## 프로젝트 구조

```
src/
├── api/            # API 클라이언트 (apiFetch: 인증 헤더, 401 재시도)
├── components/
│   └── ui/         # shadcn/ui 생성 컴포넌트 (직접 수정 금지, `npx shadcn add`로 갱신)
├── features/       # 도메인별 기능: auth, equipment, events, inspection, notification
├── hooks/          # 공용 훅 (useLiveData: SSE 실시간 갱신)
├── lib/            # firebase, date(KST 변환), utils
├── pages/          # 라우트 단위 페이지
├── routes/         # 라우터 정의, RequireAuth
└── types/          # 공용 타입
```

## Docker 배포

멀티 스테이지 빌드로 정적 파일을 만들고, nginx(비루트, **8080 포트**)로 서빙합니다.
`.env`는 이미지 레이어에 남지 않도록 BuildKit secret으로 마운트합니다.

```bash
docker build --secret id=env,src=.env -t safeguard-client .
docker run -p 8080:8080 safeguard-client
```

nginx 설정(`nginx.conf`)에는 SPA fallback, 보안 헤더(CSP 등), 정적 자원 캐시 정책이 들어 있습니다.
새 외부 도메인(API, CDN, 이미지)을 쓰면 CSP에 추가해야 합니다.

## 개발 규칙

자세한 내용은 [Git 워크플로우](docs/git-workflow.md)를 참고합니다.

- **흐름:** 이슈 → 브랜치 → 커밋 → PR → 병합
- **브랜치:** `develop`에서 `<type>/<이슈번호>-<짧은-설명>`으로 분기 (예: `feat/12-dashboard-skeleton`)
- **커밋:** `<type>(<scope>): <한국어 요약> (#이슈번호)` (예: `fix(auth): 401 응답 시 토큰 재시도 누락 수정 (#31)`)
- **PR:** `[TYPE] <요약> (#이슈번호)`, base는 `develop`, 본문에 `Closes #N`, Merge commit으로 병합
- 병합 전 `npm run lint`, `npm run build` 통과 필수 (CI에서도 검사)

### 코드 규칙

- import는 `@/` alias를 사용하고, 타입은 `import type`으로 가져옵니다.
- API 호출은 모두 `apiFetch()`를 거치며, 응답은 서버 스키마(snake_case) 그대로 사용합니다.
- 토큰은 Firebase SDK가 관리합니다. `localStorage` 등에 직접 저장하지 않습니다.
- `dangerouslySetInnerHTML`은 사용하지 않습니다 (ESLint 에러).
- 서버 시간(UTC)은 `formatKst()`로 Asia/Seoul 기준으로 표시합니다.
- 백엔드 명세가 확정되지 않은 부분은 `TODO(backend)`로 표시합니다.
