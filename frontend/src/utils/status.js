import api from "./api";

export const getStatus = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`, { id: userId });
    if(response.data.data[0].id) {
      return 'Connected';
    }
    else if (response.data.data[0].id === undefined) {
      // console.log(response.data);
      return 'Error';
    }
  } catch (error) {
    if(error?.response?.data?.data?.includes('Invalid token')) {
      return 'Expired';
    }
    // console.log(error);
    return 'Disconnected';
  }
};