import { sign } from 'jsonwebtoken';

import { SERVICE_ACCOUNT, PRIVATE_KEY, PRIVATE_KEY_ID } from '@/configs';

const createTokenPayload = () => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  return {
    iss: SERVICE_ACCOUNT,
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat,
    exp,
  };
};

export const createPreSignedToken = () => {
  return sign(createTokenPayload(), PRIVATE_KEY, {
    header: {
      kid: PRIVATE_KEY_ID,
      alg: 'RS256',
    },
    algorithm: 'RS256',
  });
};
