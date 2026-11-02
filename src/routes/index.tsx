import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'
import { RequireAuth } from './RequireAuth'

export const router = createBrowserRouter([
  {
    // 보호 대상 라우트는 RequireAuth 아래에 둔다.
    element: <RequireAuth />,
    children: [{ path: '/', element: <DashboardPage /> }],
  },
  // TODO: /login 등 공개 라우트 추가
])
