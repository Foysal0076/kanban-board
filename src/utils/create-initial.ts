export const createInitial = (name: string = '', length: 1 | 2 = 2) => {
  if (!name) return ''
  if (typeof name !== 'string') return ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, length)
}
