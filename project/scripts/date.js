// data.js
export async function getData() {
  const response = await fetch('./data.json');
  if (!response.ok) throw new Error('Ошибка загрузки JSON');
  const data = await response.json();
  return data;
}
