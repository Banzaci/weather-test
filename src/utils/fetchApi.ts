export const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if(!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: 'Error loading job list', status: 500 }
  }
  return await response.json() as T;
}
