const searchRequest = async (query) => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default {
  searchRequest
};
