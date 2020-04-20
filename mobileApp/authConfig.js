export default config = {
    issuer: 'https://login.microsoftonline.com/3602e498-fd34-4a1e-a61b-b4639ceeaffd',
    clientId: '61548776-8c50-40bc-9d95-23b1323ea7ff',
    redirectUrl: 'com.mobileapp://auth',
    additionalParameters: {
      resource: '61548776-8c50-40bc-9d95-23b1323ea7ff',
      prompt: 'login'
  
    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  }
};