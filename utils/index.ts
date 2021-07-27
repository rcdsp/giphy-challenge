import { NuxtAxiosInstance } from "@nuxtjs/axios";

export const friendlyUrl = (url: string) => {
  return url.replace(/^https?:\/\//g, '');
};

export const formatBytes = (bytesString: string, decimals = 2) => {
  const bytes = parseInt(bytesString);
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const search = async (
  axios: NuxtAxiosInstance,
  q: string,
  limit: number = 50,
  offset: number = 0,
  rating: string = 'g',
  lang: string = 'en'
) => {
  const results = await axios.$get('search', {
    params: { q, limit, offset, rating, lang },
  });

  return results
};
