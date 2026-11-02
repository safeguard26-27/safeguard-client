import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// TODO(backend): 장비·이벤트 API 명세 확정 후 데이터 연결. 지금은 레이아웃 자리만 잡는다.
// TODO: 상세 구성은 디자인 시안 기준으로 맞춘다.
export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-screen-md flex-col gap-4 p-4">
      <section aria-labelledby="summary-title">
        <h2 id="summary-title" className="sr-only">
          요약
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-10" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>층별 장비</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>활성 이벤트</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
