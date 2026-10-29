// 실시간 갱신은 SSE로 확정. EventSource는 Authorization 헤더를 못 붙이므로
// fetch 기반 SSE(@microsoft/fetch-event-source)를 쓴다. 토큰을 URL 쿼리에 넣지 않는다.
export function useLiveData() {
  // TODO(backend): SSE 엔드포인트와 페이로드 형식 확정 후 구현
  //  - 최초 진입 시 REST로 장비·이벤트 목록 조회(페이징)
  //  - event_id로 병합, measured_at으로 최신 판단
  //  - 끊기면 자동 재연결, 재연결 직후 REST 재조회로 누락분 보정
  //  - 로그아웃 시 연결 정리
}
