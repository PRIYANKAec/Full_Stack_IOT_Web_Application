import api from "@/utils/api";

export const getProjectsByUserId = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

export const getSensorsByProjectId = async (projectId) => {
  try {
    const response = await api.post(`/api/projects/${projectId}/sensor/getByProject`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch sensors:', error);
    throw error;
  }
};