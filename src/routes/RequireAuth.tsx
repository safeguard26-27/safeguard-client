import { Outlet } from 'react-router-dom'

// 화면 가드는 UX 용도일 뿐 보안 경계가 아니다. 권한 판단은 서버가 한다.
export function RequireAuth() {
  // TODO: Firebase 인증 상태 연동 후, 미로그인이면 /login 으로 보낸다.
  //       로그인 후 리다이렉트는 내부 경로 허용 목록만 받는다 (open redirect 방지).
  return <Outlet />
}
