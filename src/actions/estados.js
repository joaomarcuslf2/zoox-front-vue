import { fetchJSON, postJSON } from '../helpers/fetch';
import { getToken, deleteToken } from './token';
import { apiUrl } from '../configs';

export const getEstados = (query = []) => {
  const stringifiedQuery = query.length
    ? `${query.reduce((acc, nxt) => `${acc}filter=${JSON.stringify(nxt)}&`, '?')}`
    : '';

  return getToken().then(token =>
    fetchJSON(`${apiUrl}/estados/search${stringifiedQuery}`, {
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

export const addEstado = rawBody => {
  const { nome, abreviacao } = rawBody;
  return getToken().then(token =>
    postJSON(`${apiUrl}/estados`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      },
      body: JSON.stringify({ nome, abreviacao }),
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

export const updateEstado = rawBody => {
  const { nome, abreviacao } = rawBody;
  return getToken().then(token =>
    postJSON(`${apiUrl}/estados/${rawBody._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      },
      body: JSON.stringify({ nome, abreviacao }),
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

export const deleteEstado = rawBody => {
  return getToken().then(token =>
    postJSON(`${apiUrl}/estados/${rawBody._id}`, {
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
