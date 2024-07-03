import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  name: string;
  email: string;
}

export function getDecodedToken(): DecodedToken | null {
  const token = localStorage.getItem('token') as string | null;

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
 