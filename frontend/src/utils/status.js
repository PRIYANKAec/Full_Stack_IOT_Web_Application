import api from "./api";

export const getStatus = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`);
    if(response.data.data[0].id) {
      return 'connected';
    }
    else if (response.data.data[0].id === undefined) {
      return 'disconnected';
    }
  } catch (error) {
    if(error.response.status === 403) {
      return 'disconnected';
    }
    return 'error';
  }
};