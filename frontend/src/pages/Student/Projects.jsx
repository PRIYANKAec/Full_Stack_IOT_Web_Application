import React, { useEffect, useState } from 'react';
import { 
  createProjects, 
  getProjectsByUserId,
  deleteProject, 
  updateProject
} from '@/APIs/projectAPI';  
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    microcontroller: '',
    id: user.id,
  });
  const [editProject, setEditProject] = useState({
    projectTitle: projects.name,
    projectDescription: projects.description,
    microcontroller: projects.microcontroller,
  });


  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (user && user.id) {
          const projectsData = await getProjectsByUserId(user.id);
          
          if (projectsData.data) {
            const sortedProjects = projectsData.data.sort((a, b) => b.id - a.id); // Sort in descending order
            setProjects(sortedProjects);
          }
        }
      } catch (error) {
        console.error("Failed to fetch projects and sensors:", error);
      }
    };
    fetchProject();
  }, [user]);

      const handleDelete = async (projectId) => {
        try {
          const response = await deleteProject(projectId, user.id);
          
          if (response.status === 200) {
            setProjects((prevProjects) => 
              prevProjects.filter(project => project.id !== projectId) 
            );
          } else {
            console.error("Failed to delete project:", response.message);
          }
        } catch (error) {
          console.error('Failed to delete project:', error);
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
        alert("Please fill all fields");
        return;
      }
  
      const requestData = { 
        name: formData.title, 
        description: formData.description, 
        microcontroller: formData.microcontroller, 
        id: user.id
      };
  
      const newProject = await createProjects(requestData);
      
      if (newProject.status === "error") {
        alert(newProject.message);
        return;
      }
  
      // Ensure new project is sorted properly
      setProjects((prevProjects) => 
        [...prevProjects, newProject.data].sort((a, b) => b.id - a.id)
      );
  
      // Reset form and close dialog
      setFormData({ title: '', description: '', microcontroller: '' });
      setShowForm(false);
      
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-sans text-foreground'>My Project World!</h1>
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button 
              className="hover:bg-quaternary bg-tertiary text-secondary hover:text-foreground font-sans mr-4 mt-4">
              Create New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md text-foreground">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription className="text-primary text-base font-sans">
                Enter project details below
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-4">
              {/* <Label>User Id:</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter User Id Here !"
                  value={user.id}
                  className="cursor-not-allowed bg-gray-200"
                  readOnly
                  required
                /> */}
                <Label>Project Title:</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Title Here!"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />

                <Label>Project Description:</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter Description Here!"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />

                <Label>Microcontroller:</Label>
                <Input
                  type="text"
                  name="microcontroller"
                  placeholder="Enter μC Name Here!"
                  value={formData.microcontroller}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <DialogFooter className="mt-4">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-tertiary hover:bg-foreground text-foreground hover:text-tertiary"
                onClick = {handleFormSubmit}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Listing Projects */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-8'>
        {projects.map((project) => (
          <Card  asChild key={project.id} className='mb-4 p-4 rounded-lg rounded-b-3xl rounded-t-3xl shadow-md '>
            <CardHeader className='bg-gradient-to-r from-foreground to-tertiary text-secondary rounded-t-lg pb-3'>
            <div className='flex justify-between'>
            <HoverCard>
              <HoverCardTrigger>
              <FaTrashAlt 
                className="h-6 w-6 text-destructive cursor-pointer float-right" 
                onClick={() => handleDelete(project.id, user.id)}  
              />       
              {/* <h1>{user.id}</h1> */}
              </HoverCardTrigger>
              <HoverCardContent className="text-foreground bg-tertiary w-fit cursor-pointer" > Delete</HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger>
              <Dialog>
                  <DialogTrigger asChild>
                  <FaEdit className="float-right text-secondary-foreground text-2xl cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="bg-secondary">
                    <DialogHeader>
                      <DialogTitle className="text-foreground font-semibold">
                        Edit your Project Here !
                      </DialogTitle>
                      <DialogDescription className="text-foreground font-semibold">
                        Update your project details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-accent-foreground">
                      <Input
                        className="bg-gray-100"
                        label="ProjectTitle"
                        name="projectTitle"
                      />
                      <Input
                        className="bg-gray-100"
                        label="Project Description"
                        name="projectDescription"
                      />
                      <Input
                        className="bg-gray-100"
                        label="Microcontroller"
                        name="microcontroller"
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          className="bg-foreground hover:bg-tertiary"
                        >
                          Save</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </HoverCardTrigger>
              <HoverCardContent className="text-foreground bg-tertiary w-fit cursor-pointer">Edit</HoverCardContent>
            </HoverCard>
            </div>
              <CardTitle className='text-xl font-bold text-center'>{project.name}</CardTitle>
              <CardDescription className='text-base text-secondary text-center'>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className='py-6 px-2 sm:px-4 md:px-8  flex flex-col justify-between bg-quaternary rounded-b-2xl'>
              <div className='grid grid-cols-2 gap-2 justify-between'>
                <div className='text-lg font-bold text-primary'>Project Name:</div>
                <div className='text-lg font-medium text-primary'>{project.name}</div>
                <div className='text-primary font-medium'>Description:</div>
                <div className='text-primary font-medium'>{project.description}</div>
                <div className='text-primary font-medium'>Microcontroller:</div>
                <div className='text-primary font-medium'>{project.microcontroller}</div>
                {/* <div className='text-primary font-medium'>{project.id}</div> */}
              </div>        
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
  );
};

export default Projects;