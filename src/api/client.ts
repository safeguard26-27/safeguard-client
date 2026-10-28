import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function send(path: string, init: RequestInit, forceRefresh: boolean) {
  const user = auth.currentUser
  if (!user) throw new ApiError(401, 'Not authenticated')

  const token = await user.getIdToken(forceRefresh)
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  // X-User-* 등 내부 헤더는 보내지 않는다 (게이트웨이가 만든다).

  return fetch(`${BASE_URL}${path}`, { ...init, headers })
}

/** 모든 API 호출은 이 함수를 거친다. 응답 본문은 서버 스키마(snake_case) 그대로 반환한다. */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res = await send(path, init, false)

  // 401: 토큰 강제 갱신 후 1회 재시도, 실패 시 로그아웃
  if (res.status === 401) {
    res = await send(path, init, true)
    if (res.status === 401) {
      await signOut(auth)
      // TODO: 캐시·상태·SSE 연결·FCM 토큰 정리, /login 이동
      throw new ApiError(401, 'Unauthorized')
    }
  }

  // TODO: 403은 권한 없음 화면으로 처리
  if (!res.ok) throw new ApiError(res.status, res.statusText)

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
