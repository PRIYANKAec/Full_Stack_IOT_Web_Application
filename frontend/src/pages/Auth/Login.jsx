import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({email, password});
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-ivory">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-custom-deepBlue">LogIn To the Application</CardTitle>
          <CardDescription className="text-custom-cornflowerBlue">Let's enter into IOT world</CardDescription>
        </CardHeader>
        <CardContent>

          <form className="text-custom-softBlue" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <Label className="block font-bold mb-2 text-base px-2">UserName</Label>
              <Input
                type="text"
                name="username"
                required
                placeholder="Enter your Name"
              />

              <Label className="block font-bold mb-2 text-base px-2">E-Mail Id</Label>
              <Input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your College Email"
              />

              <Label className="block font-bold mb-2 text-base px-2">FirstName</Label>
              <Input
                type="text"
                name="firstName"
                required
                placeholder="Enter your FirstName"
              />

              <Label className="block font-bold mb-2 text-base px-2">LastName</Label>
              <Input
                type="text"
                name="lastName"
                required
                placeholder="Enter your LastName"
              />

              <Label className="block font-bold mb-2 text-base px-2">Register Number</Label>
              <Input
                type="text"
                name="registerNumber"
                required
                placeholder="Enter your Register Number"
              />

              <Label className="block font-bold mb-2 text-base px-2">Batch</Label>
              <Input
                type="text"
                name="batch"
                required
                placeholder="Enter your Batch"
              />

              <Label className="block font-bold mb-2 text-base px-2">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your Password"
              />

            </div>
          </form>

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="bg-emerald-200" >Cancel</Button>
          {/* <Link to="/home"> */}
          <Button type="submit" form="loginForm" className="bg-custom-cornflowerBlue" >Login</Button>
          {/* </Link> */}
          
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;