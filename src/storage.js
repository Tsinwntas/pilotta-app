// Thin wrapper so the app works both inside Claude artifacts (window.storage)
// and as a standalone web app (localStorage).

const useNativeStorage = typeof window !== "undefined" && typeof window.storage?.get === "function";

export async function storageGet(key) {
  if (useNativeStorage) {
    const result = await window.storage.get(key, false);
    return result?.value ?? null;
  }
  return localStorage.getItem(key);
}

export async function storageSet(key, value) {
  if (useNativeStorage) {
    await window.storage.set(key, value, false);
  } else {
    localStorage.setItem(key, value);
  }
}

export async function storageDelete(key) {
  if (useNativeStorage) {
    await window.storage.delete(key, false);
  } else {
    localStorage.removeItem(key);
  }
}
