import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  tenant: "c39d49f7-9eed-4307-b032-bb28f3cf9d79",
  clientId: "91b8fdda-8936-463b-9940-5a49d875c229",
  redirectUri:
    "https://digitaladgangskortadminui-dev-web.azurewebsites.net/.auth/login/aad/callback",
  endpoints: {
    api: "c39d49f7-9eed-4307-b032-bb28f3cf9d79"
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
