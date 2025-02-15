import api from "./api";

export const getStatus = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`);
    if(response.data.data[0].id) {
      return 'connected';
    }
    else if (response.data.data[0].id === undefined) {
      // console.log(response.data);
      return 'disconnected';
    }
  } catch (error) {
    if(error.response.status === 403) {
      // console.log(response.data);
      return 'disconnected';
    }
    return 'error';
  }
};