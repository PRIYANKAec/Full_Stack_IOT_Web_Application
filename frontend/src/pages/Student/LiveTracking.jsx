import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProjectsByUserId } from "@/APIs/projectAPI";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/loading";
import GaugeComponent from "react-gauge-component";
import { getSensorByProjectId } from "@/APIs/sensorAPI";
import { receiveSensorData } from "@/APIs/sensorDataAPI";

const LiveTracking = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getProjectsByUserId(user?.id);
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    const getSensors = async () => {
      try {
        const response = await getSensorByProjectId(
          selectedProject?.id,
          user?.id
        );
        setSensors(response.data);
      } catch (error) {
        console.error("Failed to fetch sensors:", error);
      }
    };

    const getSensorData = async () => {
      try {
        const sensorDataPromises = sensors.map((sensor) =>
          receiveSensorData(selectedProject?.id, sensor.id, user?.id)
        );
        const sensorDataResponses = await Promise.all(sensorDataPromises);
        setSensorData(sensorDataResponses.map((response) => response?.data));
        // await console.log(sensorData);
      } catch (error) {
        console.error("Failed to fetch sensors:", error);
      }
    };

    user?.id && !selectedProject && getProjects();
    selectedProject?.id && getSensors();
    sensors.length > 0 && getSensorData();
  }, [user?.id, selectedProject?.id, sensors.length]);

  if (loading) {
    return (
      <div className="relative h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-3 w-full">
      <div className="flex justify-between items-center md:px-12 lg:px-20 2xl:px-32">
        <h1 className="text-xl text-foreground font-bold items-center">
          Track each project here
        </h1>
        <Select
          value={selectedProject}
          onValueChange={(value) => setSelectedProject(value)}
        >
          <SelectTrigger className="w-[180px] bg-slate-50">
            <SelectValue placeholder={selectedProject ? selectedProject.name : "Select a Project"} />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Project Name</h1>
        <h1>{selectedProject?.name}</h1>
        <h1 className="text-2xl font-bold">Project description</h1>
        <h1>{selectedProject?.description}</h1>
        <h1 className="text-2xl font-bold">Project Microcontroller</h1>
        <h1>{selectedProject?.microcontroller}</h1>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {sensorData.map((data, index) => (
          <div key={index} className="m-4">
            <GaugeComponent
              value={data[0] ? data?.[0]?.value : 0}
              unit={data[0] ? data?.[0]?.unit : "N/A"}
              label={sensors[index]?.name}
            />
            <p className="text-center mt-2">
              {sensors[index]?.name}: {data[0] ? data?.[0]?.value : 0} {data[0] ? data?.[0]?.unit : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTracking;
