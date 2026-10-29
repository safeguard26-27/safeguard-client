# Git 워크플로우

이슈 → 브랜치 → 커밋 → PR → 병합 순서로 작업한다.

## 브랜치

- 전략: `main` + 작업 브랜치. 작업 브랜치는 `main`에서 분기하고, PR로 `main`에 병합한다.
- `main`에 직접 push할 수 없다. (GitHub Ruleset으로 차단, 아래 [GitHub 레포 설정](#github-레포-설정) 참고)
- 이름: `<type>/<이슈번호>-<짧은-설명>`
  - type은 커밋 type과 같다: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`
  - 설명은 영어 소문자 kebab-case, 3~5단어

```
feat/12-dashboard-skeleton
fix/31-sse-reconnect
chore/5-github-templates
```

## 커밋 메시지

```
<type>(<scope>): <요약> (#이슈번호)

<본문 (선택)>
```

| type       | 용도                                     |
| ---------- | ---------------------------------------- |
| `feat`     | 기능 추가                                |
| `fix`      | 버그 수정                                |
| `refactor` | 동작 변화 없는 구조 개선                 |
| `style`    | 코드 포맷, 세미콜론 등 (CSS 변경은 아님) |
| `test`     | 테스트 추가·수정                         |
| `docs`     | 문서                                     |
| `chore`    | 설정, 빌드, 의존성, CI                   |

- scope는 선택이다. 필요할 때만 붙인다. 예: `auth`, `equipment`, `events`, `inspection`, `notification`
- 요약은 **한국어**, 50자 이내, 마침표 없이, 명사형으로 끝낸다.
- 본문에는 무엇보다 **왜** 바꿨는지를 적는다.
- 한 커밋에는 논리 단위 하나만 담는다.
- 병합 방식이 Merge commit이라 브랜치의 커밋이 그대로 `main` 이력에 남는다.
  `wip`, `수정` 같은 커밋은 PR 올리기 전에 정리한다.

```
feat: 대시보드 골격 추가
fix(auth): 401 응답 시 토큰 재시도 누락 수정
chore: nginx 보안 헤더 설정
docs: Git 워크플로우 문서 추가
```

## 이슈

- 템플릿(`.github/ISSUE_TEMPLATE/`)으로만 만든다. 빈 이슈는 막혀 있다.

| 템플릿      | 제목 접두어 | 라벨    |
| ----------- | ----------- | ------- |
| 기능 추가   | `[FEAT] `   | `feat`  |
| 버그 제보   | `[BUG] `    | `bug`   |
| 작업 (Task) | `[CHORE] `  | `chore` |

- 이슈 1개 = PR 1개를 원칙으로 한다. 이슈 없는 PR은 만들지 않는다.
- 작업 시작 전에 담당자(assignee)를 지정한다.
- 로그·스크린샷을 첨부할 때 토큰, 이메일 등 개인정보는 가린다.

## PR

- **모든 PR은 이슈가 있어야 한다.** 이슈 없이 PR을 만들지 않는다. 먼저 이슈를 만든다.
- 제목: `[TYPE] <요약> (#<이슈번호>)`
  - TYPE은 커밋 type을 대문자로 쓴다: `FEAT`, `FIX`, `REFACTOR`, `STYLE`, `TEST`, `DOCS`, `CHORE`
  - 요약은 한국어, 마침표 없이 쓴다.
  - 제목 끝의 `(#<이슈번호>)`로 이슈를 멘션한다.

```
[FEAT] 대시보드 골격 추가 (#12)
[FIX] SSE 재연결 시 누락 보정 (#31)
[CHORE] 프로젝트 초기 세팅 (#2)
```

- 본문: `.github/pull_request_template.md`를 채운다. 보안 체크 항목은 빠짐없이 확인한다.
- 이슈 연결: 본문 "관련 이슈"에 `Closes #<이슈번호>`를 적어 병합 시 이슈가 자동으로 닫히게 한다.
- 병합: **Merge commit**으로 병합한다. 리뷰 승인은 필수가 아니다. 병합 후 작업 브랜치는 삭제한다.
- 병합 전 `npm run lint`, `npm run build` 통과를 확인한다.

## 작업 흐름 예시

```bash
# 1. GitHub에서 이슈 생성 (예: #12 [FEAT] 모바일 대시보드 골격)

# 2. 브랜치 생성
git switch main
git pull
git switch -c feat/12-dashboard-skeleton

# 3. 작업 후 커밋
git add <파일>
git commit -m "feat: 대시보드 골격 추가"

# 4. push 후 PR 생성 (본문에 Closes #12)
git push -u origin feat/12-dashboard-skeleton
```

## GitHub 레포 설정

- Settings → Rules → Rulesets → New branch ruleset
  - Enforcement status: `Active`
  - Bypass list: 비움 (관리자도 예외 없음)
  - Target branches: `Include default branch` (`main`)
  - Rules
    - Restrict deletions
    - Block force pushes
    - Require a pull request before merging (Required approvals: `0`)
- Settings → General → Pull Requests
  - Allow merge commits만 켠다 (squash, rebase 끔)
  - Automatically delete head branches 켠다
- Issues → Labels: `feat`, `bug`, `chore` 라벨을 만들어 둔다 (템플릿이 자동으로 붙인다)
