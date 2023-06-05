import axios from 'axios';

interface PostTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getVerifiedToken = async (preSignedToken: string): Promise<PostTokenResponse> => {
  const { data } = await axios.post<PostTokenResponse>(
    'https://oauth2.googleapis.com/token',
    {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: preSignedToken,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return data;
};
