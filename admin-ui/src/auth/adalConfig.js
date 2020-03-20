import { AuthenticationContext } from "react-adal";

export const adalConfig = {
  tenant: "3602e498-fd34-4a1e-a61b-b4639ceeaffd",
  clientId: "93a5c726-983f-4e8c-a330-f1b34e3d6752",
  redirectUri: "https://localhost:44321/signin-oidc",
  endpoints: {
    api: "3602e498-fd34-4a1e-a61b-b4639ceeaffd"
  },
  cacheLocation: "sessionStorage"
};

export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);
