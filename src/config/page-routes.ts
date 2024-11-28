export const pageRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  board: (boardId: string) => `/board/${boardId}`,
}
