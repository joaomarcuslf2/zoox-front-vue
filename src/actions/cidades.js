import { fetchJSON, postJSON } from '../helpers/fetch';
import { getToken, deleteToken } from './token';
import { apiUrl } from '../configs';

export const getCidades = (query = []) => {
  const stringifiedQuery = query.length
    ? `${query.reduce((acc, nxt) => `${acc}filter=${JSON.stringify(nxt)}&`, '?')}`
    : '';

  return getToken().then(token =>
    fetchJSON(`${apiUrl}/cidades/search${stringifiedQuery}`, {
      headers: {
        'X-Api-Key': token,
      },
    }).catch(err => {
      if (err.status === 401) {
        return deleteToken().then(err.json);
      }
      return err.json();
    })
  );
};

export const addCidade = rawBody => {
  const { nome, estadoId } = rawBody;
  return getToken().then(token =>
    postJSON(`${apiUrl}/cidades`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      },
      body: JSON.stringify({ nome, estadoId }),
    }).catch(err => {
      if (err.status === 401) {
        return deleteToken().then(err.json);
      }
      return err.json().then(error => {
        throw error;
      });
    })
  );
};

export const updateCidade = rawBody => {
  const { nome, estadoId } = rawBody;
  return getToken().then(token =>
    postJSON(`${apiUrl}/cidades/${rawBody._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      },
      body: JSON.stringify({ nome, estadoId }),
    }).catch(err => {
      if (err.status === 401) {
        return deleteToken().then(err.json);
      }
      return err.json().then(error => {
        throw error;
      });
    })
  );
};

export const deleteCidade = rawBody => {
  return getToken().then(token =>
    postJSON(`${apiUrl}/cidades/${rawBody._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      },
    }).catch(err => {
      if (err.status === 401) {
        return deleteToken().then(err.json);
      }
      return err.json().then(error => {
        throw error;
      });
    })
  );
};
