import { jwtDecode, InvalidTokenError } from 'jwt-decode';

export const decodedToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error('Invalid token:', error.message);
    } else {
      console.error('An error occurred while decoding the token:', error);
    }
    return null; // Or handle the error in an appropriate way
  }
};
