// import axios from 'axios';
import data from '../../Sample/valueCheckerOp.json'

// Define the API endpoint
const API_URL = 'http://localhost:5000/value-checker';

// Function to post data to the health checker endpoint
export const postValueCheckerData = async (dataSources, testCases) => {
  // try {
  //   const response = await fetch(API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ sources:dataSources, functions:testCases }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("hellooooooooooo", data)
  //     return data;
  //   } else {
  //     throw new Error('Failed to fetch');
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   throw error;
  // }
  console.log("Api Output", data)
  return data;

};
