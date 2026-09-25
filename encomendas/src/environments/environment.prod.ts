export const environment = {
  production: true,
  apiUrl:
    (globalThis as { __APP_API_URL__?: string }).__APP_API_URL__ ??
    'https://encomendas-api.onrender.com',
};
