import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  tenant: "3602e498-fd34-4a1e-a61b-b4639ceeaffd",
  clientId: "93a5c726-983f-4e8c-a330-f1b34e3d6752",
  redirectUri:
    "https://digitaladgangskortadminui-dev-web.azurewebsites.net/.auth/login/aad/callback",
  endpoints: {
    api: "3602e498-fd34-4a1e-a61b-b4639ceeaffd"
  },
  cacheLocation: "sessionStorage"
};

export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
