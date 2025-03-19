const BASE_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const api = {
  request: async (endpoint: string, method: string = 'GET', data?: any) => {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Jsio-Token': API_TOKEN, // Keep the authentication token
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  },
};

// Example usage (you can remove these later, they are just for demonstration):
// api.request('/pessoas', 'GET').then(data => console.log('GET:', data));
// api.request('/pessoas', 'POST', { name: 'John Doe' }).then(data => console.log('POST:', data));
