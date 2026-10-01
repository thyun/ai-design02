---
mock API를 실제 API로 변경하려면 어떻게 변경해야 해?

핵심은 mockUsersApi.ts를 실제 HTTP 클라이언트로 교체하고, MSW 초기화 의존을 제거하는 것입니다. 현재 구조면 영향 범위는 작습니다.
1.
API 레이어 교체
지금 users/index.tsx는 createUser, deleteUser, listUsers, updateUser만 호출하므로, 이 인터페이스를 유지한 채 src/mockUsersApi.ts를 실제 API 구현으로 바꾸는 게 가장 안전합니다.
또는 파일명을 usersApi.ts로 바꾸고 users/index.tsx import를 교체해도 됩니다.
2.
실제 요청 구현
listUsers() → fetch('/api/users')
createUser(form) → fetch('/api/users', { method: 'POST', body: ... })
updateUser(id, form) → fetch(\/api/users/${id}`, { method: 'PUT' | 'PATCH' })
deleteUser(id) → fetch(\/api/users/${id}`, { method: 'DELETE' })
응답 JSON shape을 현재 User 타입과 맞추거나, API 응답을 UI용 User로 매핑하는 normalize 함수를 두는 게 좋습니다.
3.
타입 정리
지금 User, UserRole 타입은 그대로 재사용 가능합니다.
백엔드 응답이 다르면 예를 들어:
last_login → lastLogin
status: 'active' → 'Active'      같은 변환을 API 레이어에서 처리하세요.
4.
mocking 제거
main.tsx의 enableMocking() 호출 제거
더 이상 안 쓰면 src/mocks/도 정리 가능
개발 환경에서만 mock을 유지하고 싶다면 환경 변수로 분기:
if (import.meta.env.VITE_USE_MOCKS === 'true') { ... }
5.
에러/로딩 처리 보강
지금 users/index.tsx는 로딩만 있고 요청 실패 UI는 없습니다.
실제 API로 바꾸면 최소한:
목록 조회 실패 상태
생성/수정/삭제 실패 처리      는 추가하는 게 좋습니다.
예시 방향은 아래처럼 잡으면 됩니다.
export async function listUsers(): Promise<User[]> {
const response = await fetch('/api/users');

if (!response.ok) {
throw new Error('Failed to load users');
}

const data = await response.json();
return data.map(mapUser);
}
function mapUser(apiUser: ApiUser): User {
return {
id: apiUser.id,
name: apiUser.name,
email: apiUser.email,
role: apiUser.role,
status: normalizeStatus(apiUser.status),
lastLogin: apiUser.last_login ?? '—',
};
}
백엔드 API 스펙만 있으면 그 스펙 기준으로 이 프로젝트에 맞는 실제 교체 코드 단위까지 바로 정리할 수 있습니다.
