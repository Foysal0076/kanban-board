export const setLocalStorage = (key: string, value: any): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || !window.localStorage) {
    return false
  }

  if (!key) {
    return false
  }
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (_) {
    return false
  }
}
