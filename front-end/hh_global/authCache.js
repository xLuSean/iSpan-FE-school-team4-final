const authCache = {
  auth: null,
};

export const getAuthHeaders = () =>
  authCache.auth === null
    ? {}
    : {
        Authorization: `Bearer ${authCache.auth.accessToken}`,
      };

export const setAuthCache = (newAuth) => {
  authCache.auth = newAuth === undefined ? null : { ...newAuth };
};
