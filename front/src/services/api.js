const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const hasBody = !!(body && method !== 'GET' && method !== 'HEAD');
  const opts = {
    method,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}` , opts);
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = isJson ? (data.message || JSON.stringify(data)) : data;
    throw new Error(message || `Erro ${res.status}`);
  }
  return data;
}

// Plans
export const getPlans = () => request('/plans');
export const createPlan = (payload) => request('/plan', { method: 'POST', body: payload });
export const updatePlan = (payload) => request('/plan', { method: 'PUT', body: payload });
export const deletePlan = (id) => request(`/plan?id=${id}`, { method: 'DELETE' });

// Clients
export const getClients = () => request('/clients');
export const createClient = (payload) => request('/client', { method: 'POST', body: payload });
export const updateClient = (payload) => request('/client', { method: 'PUT', body: payload });
export const deleteClient = (id) => request(`/client?id=${id}`, { method: 'DELETE'});

// Purchases
export const getPurchases = () => request('/purchases');
export const createPurchase = (payload) => request('/purchase', { method: 'POST', body: payload });

export default {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getPurchases,
  createPurchase,
};
