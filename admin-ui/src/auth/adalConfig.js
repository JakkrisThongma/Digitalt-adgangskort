import { AuthenticationContext } from "react-adal";

export const adalConfig = {
  tenant: "c39d49f7-9eed-4307-b032-bb28f3cf9d79",
  clientId: "91b8fdda-8936-463b-9940-5a49d875c229",
  redirectUri: "https://localhost:44321/signin-oidc",
  endpoints: {
    api: "c39d49f7-9eed-4307-b032-bb28f3cf9d79"
  },
  cacheLocation: "sessionStorage"
};
export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);
