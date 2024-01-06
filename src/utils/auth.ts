// import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const checkRefreshToken = async () => {
  const _refreshToken = localStorage.getItem('refreshToken');

  const isTokenValid = isValidToken(_refreshToken || '');

  if (!isTokenValid) {
    console.error('Invalid refresh token');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('@ud');
    return null;
  }
  return _refreshToken;
};
