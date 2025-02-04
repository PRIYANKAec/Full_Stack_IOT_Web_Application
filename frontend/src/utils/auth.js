export const saveToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};