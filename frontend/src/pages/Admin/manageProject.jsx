import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { deleteProject, getAllProjects, updateProject } from '@/APIs/projectAPI';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card1';
import {
  Dialog,

DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/loading';
import { toast } from 'sonner';
import { getAllUser } from '@/APIs/updateUser';

const ManageProject = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); //create form
  const [isEditing, setIsEditing] = useState(false);//edit form
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    microcontroller: "",
    id: user.id,
  });

  useEffect(() => {
    const fetchProjects = async () => {
        if (!user?.id) {
          console.error("User ID is missing");
          return;
        }
      try {
        const projectData = await getAllProjects(user.id); 
        setProjects(projectData);
        // console.log("Projects:", projectData);

        const allUsersData = await getAllUser(user.id);
        console.log("All Users:", allUsersData);

        if (Array.isArray(allUsersData)) {
          setAllUsers(allUsersData);
          console.log("All Users:", allUsersData);
        } else {
          console.error("Invalid project data format:", projectData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleDelete = async (projectId) => {
    try {
      const response = await deleteProject(projectId, user.id);

      if (response.status === 'success') {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        toast.success(response.message);
      } else {
        console.error("Failed to delete project:", response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project" + error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description || !formData.microcontroller) {
        setShowForm(false);
        toast.error("Please fill all fields");
        return;
      }

      const requestData = {
        name: formData.title,
        description: formData.description,
        microcontroller: formData.microcontroller,
        id: user.id,
      };

      if (isEditing) {
        const updatedProject = await updateProject(formData.id, user?.id, { name: requestData.name, description: requestData.description, microcontroller: requestData.microcontroller });
        if (updatedProject.status === "success") {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === formData.id ? updatedProject.data : project
            )
          );
          toast.success(updatedProject.message);
        } else {
          toast.error(updatedProject.message);
        }
      }

      setFormData({ title: "", description: "", microcontroller: "" });
      setIsEditing(false);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project" + error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.name,
      description: project.description,
      microcontroller: project.microcontroller,
      id: project.id,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDialogClose = () => {
    setFormData({ title: "", description: "", microcontroller: "" });
    setShowForm(false);
    setIsEditing(false);
  };

  const handleExplore = (projectId) => {
    navigate(`/allTracking/${projectId}`);
  };

  if (loading) {
    return (
      <div className="relative h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex items-center mt-4 ml-5 text-lg sm:text-xl lg:text-2xl text-foreground font-bold">
        Manage & Explore Projects
      </h1>

      <div className="ml-10 mt-10 mr-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader className=" bg-gradient-to-r from-foreground to-tertiary text-secondary  rounded-t-xl flex justify-between">
                <div className='flex flex-row justify-between'>
                <HoverCard>
                  <HoverCardTrigger>
                  <FaTrashAlt className='h-6 w-6 text-destructive cursor-pointer float-right' 
                    onClick={() => handleDelete(project.id, user.id)}
                  />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-foreground bg-gray-300 w-fit cursor-pointer" >Delete</HoverCardContent>
                </HoverCard>
               
                <Dialog open={showForm}>
                  <DialogTrigger>
                  <FaPencilAlt className='h-6 w-6 float-right text-secondary-foreground cursor-pointer' 
                    onClick={() => handleEdit(project)}
                  />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md text-foreground font-bold bg-secondary rounded-xl">
                    <DialogHeader>
                      <DialogTitle>Update project details below</DialogTitle>
                      <DialogDescription>
                        Update the project details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} >
                <div className="grid gap-4">
                <Label className="font-medium text-foreground">
                  Project Title:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />

                <Label className="font-medium text-foreground">
                  Project Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />

                <Label className="font-medium text-foreground">
                  Microcontroller:
                </Label>
                <Input
                  type="text"
                  name="microcontroller"
                  value={formData.microcontroller}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />
              </div>
              <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-foreground hover:bg-tertiary text-white"
              >Update </Button>
            </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                </div>
                <div className='flex flex-col items-left -mr-0'>
                  <CardTitle className="text-xl font-bold text-center">{project.name}</CardTitle>
                  <CardDescription className="text-base text-secondary text-center">
                    {project.description || "No description available"}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="text-foreground" >
                <p>Microcontroller: {project.microcontroller || "Unknown"}</p>
                <p><strong>RegisterNumber:</strong> { 
                  allUsers.find(user => user.id === project.userId)?.registerNumber || "Unknown" 
                }
              </p>
              <p><strong>Batch:</strong> { 
                  allUsers.find(user => user.id === project.userId)?.batch || "Unknown" 
                }
              </p>
              </CardContent>
              <CardFooter className="flex justify-center" >
                <Button  
                className="bg-foreground text-white hover:bg-tertiary hover:text-secondary font-semibold mt-2" 
                onPress={() => handleExplore(project.id)}
                >Explore</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full" >No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProject;
