export async function saveToLocalStorage<T>(key: string, data: T){
  localStorage.setItem(key, JSON.stringify(data));
}

export async function getFromLocalStorage<T>(key: string){
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) as T : null;
}