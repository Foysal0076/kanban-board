export const generateID = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `${timestamp}-${random}`
}
