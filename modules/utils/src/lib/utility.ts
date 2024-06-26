import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  [key: string]: any;
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const decodeToken = (): DecodedToken | null => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token) as DecodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

export default { getToken, decodeToken };
