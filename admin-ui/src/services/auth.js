import { adalFetch, AuthenticationContext, withAdalLogin } from "react-adal";

export const auth = {
  tenant: "3602e498-fd34-4a1e-a61b-b4639ceeaffd",
  clientId: "93a5c726-983f-4e8c-a330-f1b34e3d6752",
  redirectUri: "http://localhost:44321/",
  endpoints: {
    api: "93a5c726-983f-4e8c-a330-f1b34e3d6752"
  },
  cacheLocation: "sessionStorage"
};

export const authContext = new AuthenticationContext(auth);
export const getToken = () => authContext.getCachedToken(auth.clientId);
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, auth.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, auth.endpoints.api);
