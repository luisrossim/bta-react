export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorageItem<T>(key: string): T | undefined {
  const data = localStorage.getItem(key);
  if (!data) return undefined;

  try {
    return JSON.parse(data) as T;
  } catch {
    removeStorageItem(key);
    return undefined;
  }
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}
