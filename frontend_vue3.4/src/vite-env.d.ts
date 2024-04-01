/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_username: string
  VITE_age: number
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent<Record<string, never>, Record<string, never>, any>
//   export default component
// }
