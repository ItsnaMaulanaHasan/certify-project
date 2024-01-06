import cryptoJS from 'crypto-js';

import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export const encodeData = (data: object) => {
  if (!data) return null;
  const encrypted = cryptoJS.AES.encrypt(
    JSON.stringify(data),
    `${process.env.NEXT_PUBLIC_SECRET_KEY}`
  ).toString();
  return encrypted;
};

export const decryptData = (data: any) => {
  if (!data) return null;
  const decoded = cryptoJS.AES.decrypt(data, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
  if (decoded.sigBytes === 0) return null;
  const decrypted = JSON.parse(decoded.toString(cryptoJS.enc.Utf8));
  return decrypted;
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: any) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
