export async function fetchCoins() {
  return fetch("/data.json").then((response) => response.json());
}
