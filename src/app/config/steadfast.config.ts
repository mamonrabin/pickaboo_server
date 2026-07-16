import axios from 'axios';
import config from './index.js';

export const steadfastApi = axios.create({
  baseURL: config.steadfast_base_url as string,

  headers: {
    'Api-Key': config.steadfast_api_key,
    'Secret-Key': config.steadfast_secret_key,
    'Content-Type': 'application/json',
  },
});
