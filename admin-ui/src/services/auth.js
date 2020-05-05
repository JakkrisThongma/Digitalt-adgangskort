import { adalFetch, AuthenticationContext, withAdalLogin } from "react-adal";

export const auth = {
  tenant: "3602e498-fd34-4a1e-a61b-b4639ceeaffd",
  clientId: "61548776-8c50-40bc-9d95-23b1323ea7ff",
  redirectUri: "http://localhost:44321/",
  endpoints: {
    api: "3602e498-fd34-4a1e-a61b-b4639ceeaffd"
  },
  cacheLocation: "sessionStorage"
};

export const authContext = new AuthenticationContext(auth);
export const getToken = () => authContext.getCachedToken(auth.clientId);
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, auth.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, auth.endpoints.api);
