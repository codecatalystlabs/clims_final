import apiClient from "./apiClient";


export const login = async ({ username, password }:any) => {
  const response = await apiClient.post('/login', {username,password});

  // if (!response.ok) {
  //   throw new Error('Login failed');
  // }

  // Assuming the server responds with a JSON object containing the user token


  return response;
};
