interface Storage {
  session: Storage

  set(key: string, val?: any): any

  get(key: string, def?: any): any

  has(key: string): boolean

  remove(key: string): void

  clear(): void

  getAll(): any

  forEach(callback: () => void): void
}

declare module 'good-storage' {
  const storage: Storage
  export default storage
}
