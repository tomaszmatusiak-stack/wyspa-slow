/**
 * Minimalny magazyn klucz–wartość na IndexedDB.
 * Bez zależności: dane to kilka kilobajtów, a jedna funkcja jest łatwiejsza
 * do podmiany niż cała biblioteka, gdyby kiedyś doszła synchronizacja.
 */

const DB_NAME = 'wyspa-slow'
const STORE = 'kv'
const VERSION = 1

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

export async function kvGet<T>(key: string): Promise<T | undefined> {
  try {
    const db = await openDb()
    return await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => resolve(req.result as T | undefined)
      req.onerror = () => reject(req.error)
    })
  } catch {
    return undefined
  }
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  try {
    const db = await openDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(value, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    /* Brak zapisu nie może wywalić lekcji — dziecko dogra postęp następnym razem. */
  }
}

/**
 * Prosi przeglądarkę, żeby nie usuwała naszych danych przy braku miejsca na dysku.
 * Bez tego IndexedDB jest „best effort" i system może je wyrzucić — a tu siedzi
 * kilka tygodni pracy dziecka.
 *
 * Zwraca `true`, gdy dane są objęte ochroną. Safari nie wspiera `persist()`,
 * więc tam ochronę daje dopiero dodanie apki do ekranu głównego.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (!navigator.storage?.persisted) return false
    if (await navigator.storage.persisted()) return true
    if (!navigator.storage.persist) return false
    return await navigator.storage.persist()
  } catch {
    return false
  }
}

/** Zapisy są częste (co odpowiedź), więc zbijamy je w jeden. */
export function debounced<T extends unknown[]>(fn: (...args: T) => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
