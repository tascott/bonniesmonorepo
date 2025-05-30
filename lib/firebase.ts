// This is a mock Firebase implementation since we're not using authentication

// Mock app for type compatibility
const app = {
  name: 'mock-app',
  options: {},
  automaticDataCollectionEnabled: false
}

// Mock auth object with the necessary properties and methods
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    // Always return null user
    callback(null)
    // Return a mock unsubscribe function
    return () => {}
  }
}

export default app

