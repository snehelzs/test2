export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID, // Application (client) ID
    authority: process.env.REACT_APP_AUTHORITY, // Directory (tenant) ID
    redirectUri: process.env.REACT_APP_REDIRECT_URI, // Your redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['user.read'], // Add other scopes if needed
};
