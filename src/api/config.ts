export const BACKEND_URL: string = (
  import.meta.env.VITE_BACKEND_URL || 'http://localhost/clims_nov/public'
).replace(/\/+$/, '');

export const API_BASE_URL = `${BACKEND_URL}/api`;
