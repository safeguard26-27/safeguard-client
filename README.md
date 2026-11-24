# safeguard-client

실시간 소화 설비 상태 모니터링 시스템의 웹 클라이언트(PWA)입니다.
모바일 화면 기준으로 대시보드, 장비, 이벤트, 점검, 알림 기능을 제공합니다.

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

## 시작하기

**요구 사항:** Node.js 20, npm

```bash
git clone https://github.com/safeguard26-27/safeguard-client.git
cd safeguard-client
npm ci
npm run dev
```

개발 서버의 `/api` 요청은 `VITE_API_BASE_URL`(없으면 `http://localhost:8080`)로 프록시됩니다.

### 환경 변수

팀에서 공유받은 `.env`를 프로젝트 루트에 둡니다. 필요한 변수 목록은 [`.env.example`](.env.example)에 있습니다.

> ⚠️ 공개 레포입니다. `.env`는 커밋하거나 이슈·PR·스크린샷에 올리지 않습니다.
> `VITE_` 변수는 번들에 포함되어 누구나 볼 수 있으므로 공개 가능한 값(Firebase web config, API 주소)만 넣습니다.

### 스크립트

| 명령              | 설명                                 |
| ----------------- | ------------------------------------ |
| `npm run dev`     | 개발 서버                            |
| `npm run build`   | 타입 체크 후 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기                   |
| `npm run lint`    | ESLint 검사                          |

### Docker

nginx(비루트, 8080 포트)로 정적 파일을 서빙합니다. `.env`는 이미지에 남지 않도록 BuildKit secret으로 넘깁니다.

```bash
docker build --secret id=env,src=.env -t safeguard-client .
docker run -p 8080:8080 safeguard-client
```

새 외부 도메인(API, 이미지 등)을 쓰면 `nginx.conf`의 CSP에 추가해야 합니다.

## 프로젝트 구조

```
src/
├── api/          # API 클라이언트 (인증 헤더, 401 재시도)
├── components/ui # shadcn/ui 컴포넌트
├── features/     # 도메인별 기능 (auth, equipment 등)
├── hooks/        # 공용 훅 (useLiveData: SSE 실시간 갱신)
├── lib/          # firebase, 날짜(KST) 변환 등
├── pages/        # 라우트 단위 페이지
├── routes/       # 라우터, 인증 가드
└── types/        # 공용 타입
```

## 기여하기

협업 규칙, 커밋 컨벤션, 코드 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해 주세요.
