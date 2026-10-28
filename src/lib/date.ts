const TIME_ZONE = 'Asia/Seoul'

const formatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** 서버가 준 UTC ISO-8601 문자열을 Asia/Seoul 기준 표시 문자열로 변환한다. */
export function formatKst(isoUtc: string): string {
  const date = new Date(isoUtc)
  if (Number.isNaN(date.getTime())) return ''
  return formatter.format(date)
}
