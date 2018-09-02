import cookie from 'cross-cookie';
import { fetchJSON } from '../helpers/fetch';
import { apiUrl } from '../configs';

export const getToken = () => {
  return cookie.get('api-token').then(token => {
    if (!token) {
      return fetchJSON(`${apiUrl}/auth`).then(({ token }) => cookie.set('api-token', token).then(() => token));
    }
    return token;
  });
};

export const deleteToken = () => {
  return cookie.remove('api-token');
};
