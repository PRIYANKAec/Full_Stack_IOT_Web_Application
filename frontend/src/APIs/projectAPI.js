import api from "@/utils/api"

// Create a new project
export const createProjects = async (userId) => {
    try {
        const response = await api.post('/api/projects/create',);
        return response.data.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Update a project
export const updateProject = async (projectId) => {
    try {
      const response = await api.patch(`/api/projects/update/${projectId}`, { projectId: projectId });
      return response.data.data;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  };

  // Read all projects by using userId
export const getProjectsByUserId = async (userId) => {
    try {
        const response = await api.post(`/api/projects/getByUser/${userId}`, { id: userId });
        const projects = response.data.data;

        if (projects.length === 0) {
            return 'No projects exist for this user';
        }

        return projects;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
    }
};
   
// Read all projects 
export const getAllProjects = async () => {
    try {
        const response = await api.get('/api/projects/getAll');
        const projects = response.data.data;

        return projects.length === 0 ? 'No projects exist' : projects;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
    }
};

  // Read a project by using projectId
  export const getProjectById = async (projectId) => {
    try {
      const response = await api.post(`/api/projects/get/${projectId}`, { id: projectId });
      const projects = response.data.data;

        return projects.length === 0 ? 'No projects exist' : projects;
    } catch (error) {
      console.error('', error);
      throw error;
    }
  };

  // Delete a project
export const deleteProject = async (projectId) => {
    try {
      const response = await api.patch(`/api/projects/delete/${projectId}`, { id: projectId });
      return response.data.data;
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  };
