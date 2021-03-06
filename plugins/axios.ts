import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosRequestConfig } from 'axios';

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onRequest((config: AxiosRequestConfig) => {
    config.params = {
      ...config.params,
      api_key: 'vfM9EIihwF1i1fAXfiCjvIH7umVZ0LgC', // this should probably be added on middleware with an env variable to not expose on network
    };
  });
}
