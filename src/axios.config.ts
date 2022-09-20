import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
/* 
access_token: "ya29.a0AVA9y1s-sPXaTa7winWmpcBAc8syviYCMMaDIjJuD9DzMeDDHYzIuy0tVAcE4BSunevVbDbhWzetaJUf8KaZq3W5Fgu2rVW2449j_67Bm8PEM-umvw60GjEpG6CByhX6GZVXBGv_1KPQiga7by3VZjZ22EsRaCgYKATASAQASFQE65dr8PkgObV2HvfSTDq3XKt6O_A0163"
expires_at: "2022-09-06T14:28:47.294Z"
expires_in: 3599
id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU4NDdkOTk0OGU4NTQ1OTQ4ZmE4MTU3YjczZTkxNWM1NjczMDJkNGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1Nzg1MDAzMTg5MjYtbTBxYWNhNnMzaWZ1NTBpNGQ4dm5zbWVncThpajhyaDkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1Nzg1MDAzMTg5MjYtbTBxYWNhNnMzaWZ1NTBpNGQ4dm5zbWVncThpajhyaDkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcxMTM5MDk3MDE5MjE4Mjg4MDQiLCJlbWFpbCI6ImJlbmNoaWVraG1vdWhlYkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InY3X0tDMUpJaENlVHJqcGxsWnJwRVEiLCJuYW1lIjoibW91aGViIGJlbmNoaWVraCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BSXRidm1rRG10aFpoOVBJOFUwSmNmdXpadHUtMENKNnMyVFBsTEI2N1ZKSD1zOTYtYyIsImdpdmVuX25hbWUiOiJtb3VoZWIiLCJmYW1pbHlfbmFtZSI6ImJlbmNoaWVraCIsImxvY2FsZSI6ImZyIiwiaWF0IjoxNjYyNDcwOTI4LCJleHAiOjE2NjI0NzQ1Mjh9.q1OcYyifQe5_cTGhGUv0Pr__8NBrFFUy8-sEuiBO5VAHlu4WGk2NDBugB19iVTpA7yZKSUxc-jEHbOMG4ZjruquAba8Iupqp9U5KWf0cv05c9ffNc1CkgTZdz0rhp3PVPb4AMOkbVvhUgklY5dy1DMx2l4Pj-VeA_4XBkjiMmVW6FjNNZRTWB0kNuWLBx3JH8m8_BqpGdq26zGD75iER3n_HfpaMUSul2yifgHRbD0DoS-6Cp-h3ZzWaOgyOlvX-UY43oD8ImmDmA5jfxdmFN1cbtVqzC-fz4NaXZrhKxXtszPOsUOTIQKpU8iAOgpCfDNP-1I66Y82wQb8ExaeZvw"
refresh_token: "1//09eBB6vVUetdfCgYIARAAGAkSNwF-L9IrPhMV83nWWGASa_AsJuHpYjTPHhWDdjJOIHwzyhMDTlzsA2Kh2truujp40GAQIlcEa6A"
scope: "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
token_type: "Bearer"
*/

const tokenKey = 'token';

export const getToken = () => {
  const token = localStorage.getItem(tokenKey);
  if (token) return JSON.parse(token);
};

const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

const isTokenExpired = () => {
  const token = getToken();

  if (token) {
    const date = new Date();
    return token.expires_at < date.toISOString();
  }
};

const getRefreshedToken = () => {
  return axios.post(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {
    token: getToken(),
  });
};

const refreshToken = async () => {
  const newToken = await getRefreshedToken();
  setToken(JSON.stringify(newToken.data));
};

axiosInstance.interceptors.request.use(async (req) => {
  if (isTokenExpired()) {
    await refreshToken();
  }

  req.headers = { Authorization: `Bearer ${getToken()?.access_token}` };
  return req;
});
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
