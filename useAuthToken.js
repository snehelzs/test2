// // src/hooks/useAuthToken.js
// import { useMsal } from '@azure/msal-react';
// import { useState, useEffect } from 'react';

// const useAuthToken = () => {
//     const { instance } = useMsal();
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         console.log("reached before fetchToken")
//         const fetchToken = async () => {
//             try {
//                 const account = instance.getActiveAccount();
//                 const response = await instance.acquireTokenSilent({
//                     scopes: ['api://9f385813-9b34-4ab7-8569-ace008e18ddc/access_as_user'],
//                     account: account
//                 });
//                 setToken(response.accessToken);
//                 console.log(token)
//             } catch (error) {
//                 console.error('Token acquisition failed', error);
//             }
//         };

//         fetchToken();
//     }, [instance]);

//     return token;
// };

// export default useAuthToken;



import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

const useAuthToken = () => {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (accounts.length === 0) {
      console.log('No accounts found');
      return;
    }

    const account = accounts[0]; // Get the first account
    const request = {
      scopes: ['user.read'],
      account: account
    };

    instance.acquireTokenSilent(request).then(response => {
      setToken(response.accessToken);
    }).catch(error => {
      console.error('Token acquisition failed', error);
    });
  }, [instance, accounts]);

  return token;
};

export default useAuthToken;
