export const getLocalStorage = <T>(key: string): T | null => {
  if (!key) {
    return null
  }

  try {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !window.localStorage) {
      return null
    }

    const item = localStorage.getItem(key)
    // Return null if item doesn't exist
    if (!item) {
      return null
    }

    // Attempt to parse JSON data
    const parsedItem = JSON.parse(item)
    return parsedItem
  } catch (_error) {
    // Return null if any error occurs (invalid JSON, access errors, etc.)
    return null
  }
}
