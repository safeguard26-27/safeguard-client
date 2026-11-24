# 기여 가이드

브랜치·라벨·레포 설정 등 자세한 내용은 [Git 워크플로우](docs/git-workflow.md)에 있습니다.

## 작업 흐름

**이슈 → 브랜치 → 커밋 → PR → 병합**

| 항목 | 규칙 | 예시 |
| --- | --- | --- |
| 브랜치 | `develop`에서 `<type>/<이슈번호>-<짧은-설명>`으로 분기 | `feat/12-dashboard-skeleton` |
| 커밋 | `<type>(<scope>): <한국어 요약>` | `fix(auth): 401 응답 시 토큰 재시도 누락 수정` |
| PR 제목 | `[TYPE] <한국어 요약> (#이슈번호)` | `[FEAT] 대시보드 골격 추가 (#12)` |

- type: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`
- PR은 이슈가 있어야 하고, base는 `develop`, 본문에 `Closes #N`을 적습니다. 병합은 Merge commit으로 합니다.
- 병합 전 `npm run lint`, `npm run build`가 통과해야 합니다 (CI에서도 검사).

## 코드 규칙

- import는 `@/` alias를 쓰고, 타입은 `import type`으로 가져옵니다.
- API 호출은 모두 `apiFetch()`(`src/api/client.ts`)를 거칩니다. 응답 필드는 서버 스키마(snake_case) 그대로 씁니다.
- 장비·이벤트 식별은 `uuid`로 합니다.
- 서버 시간(UTC)은 `formatKst()`로 Asia/Seoul 기준으로 표시합니다.
- 백엔드 명세가 확정되지 않은 부분은 `TODO(backend)`로 표시합니다.
- `src/components/ui/`는 shadcn이 생성한 파일입니다. `npx shadcn@latest add <name>`으로 추가합니다.

## 보안

- 토큰은 Firebase SDK가 관리합니다. `localStorage` 등에 직접 저장하지 않습니다.
- `dangerouslySetInnerHTML`은 쓰지 않습니다 (ESLint 에러). 서버 문자열도 텍스트로만 렌더링합니다.
- 콘솔·로그·스크린샷에 토큰, 이메일, UUID 등을 남기지 않습니다.
