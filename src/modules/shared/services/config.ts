import axios from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_URL_BACK,
});

baseApi.interceptors.request.use(
  (config: any) => {
    let token = '';
    const tokenStore = localStorage.getItem('token');

    if (tokenStore) {
      const tokenData = tokenStore && JSON.parse(tokenStore);

      if (tokenData.state.token !== '') {
        token = `Bearer ${tokenData.state.token}`;
      }
    }

    config.headers.Authorization = token;
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = '*';
    config.headers['Access-Control-Allow-Credentials'] = true;

    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  },
);
