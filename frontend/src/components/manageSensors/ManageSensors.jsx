import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { createSensor, getSensorByProjectId } from '@/APIs/sensorAPI'

const ManageSensors = ({projectId, userId }) => {
  const [sensorName, setSensorName] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCreateSensor = async () => {
    if (!sensorName || !sensorType) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    
    if (sensorType !== "INPUT" && sensorType !== "OUTPUT") {
      setMessage({ type: "error", text: "Sensor type must be 'INPUT' or 'OUTPUT'." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const data = { name: sensorName, type: sensorType, userId: String(userId) };

    try {
      const response = await createSensor(projectId, data);
      console.log("Create Sensor Response:", response);
      // console.log("Sensor Name:", sensorName);
      // console.log("Sensor Type:", sensorType);
      console.log("User ID:", userId);

      if (response.status === 201) {
        setMessage({ type: "success", text: "Sensor created successfully!" });
        setSensorName("");
        setSensorType("");
      } else {
        setMessage({ type: "error", text: response.message || "Failed to create sensor." });
      }
    } catch (error) {
      console.error("Error while creating sensor:", error);
      setMessage({ type: "error", text: "An error occurred while creating the sensor." });
    } finally {
      setLoading(false);
    }
  }

  return (
        <Popover>
          <PopoverTrigger asChild>
          <Button className='bg-foreground text-slate-100 hover:bg-primary hover:text-slate-200 font-semibold '>
            Manage Sensors
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit flex flex-col space-2 p-2 bg-quaternary  rounded-xl shadow-xl justify-evenly">
          <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3 gap-2 text-foreground ">
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>       
      </TabsList>
  
      {/* Create Sensors */}
      <TabsContent value="create" className="w-full text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Create Sensor</CardTitle>
          <CardDescription className="text-foreground text-base">
            Click Create when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground text-base">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label className="text-lg">Sensor Name:</Label>
            <Input type="text" value={sensorName} onChange={(e) => setSensorName(e.target.value)} />
            <Label className="text-lg">Sensor Type:</Label>
            <Input type="text" value={sensorType} placeholder="Type 'INPUT' or 'OUTPUT'" onChange={(e) => setSensorType(e.target.value)} />
          </div>
          {message && (
            <p className={`mt-2 text-${message.type === "error" ? "red-500" : "green-500"}`}>
              {message.text}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" className="bg-destructive hover:bg-red-300" onClick={() => setMessage(null)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-foreground hover:bg-primary" onClick={handleCreateSensor} disabled={loading}>
            Create
          </Button>
        </CardFooter>
      </Card>
          </TabsContent>

      {/* Update Sensor */}
      <TabsContent value="update" className="w-full text-foreground" >
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Update</CardTitle>
            <CardDescription  className="text-foreground text-base">
            Make changes to your sensors here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground text-base">
            <div className="grid w-full max-w-sm items-center gap-2">
            <Label className="text-lg" > Sensor Name:</Label>
            <Input type="text"/>
            <Label className="text-lg" > Sensor Type:</Label>
            <Input type="text"/>
        </div>
          </CardContent>
          <CardFooter className="flex justify-between">
             <Button type="cancel" className="bg-destructive hover:bg-red-300" >Cancel</Button>
            <Button type="submit" className="bg-foreground hover:bg-primary" >Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>


      {/* Delete Sensor */}
      <TabsContent value="delete" className="w-full text-foreground">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Delete</CardTitle>
            <CardDescription  className="text-foreground text-base">
              Select your sensors to delete.
            </CardDescription>
          </CardHeader>
          <CardContent  className="text-foreground text-base">
          <Select >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sensors</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
          </CardContent>
          <CardFooter className="flex justify-end">
          <Button type="delete" className="bg-destructive hover:bg-red-300" >Delete</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
          </PopoverContent>
        </Popover>
      )
}

export default ManageSensors