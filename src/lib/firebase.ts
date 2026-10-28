import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// 값은 .env 에서 주입한다. 키를 하드코딩하지 않는다.
const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
})

// 토큰은 Firebase SDK가 관리한다. 직접 저장하지 않는다.
export const auth = getAuth(firebaseApp)
