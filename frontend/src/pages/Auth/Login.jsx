import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-center text-custom-deepBlue">LogIn To the Application</CardTitle>
          <CardDescription className="text-blue-900 text-lg flex justify-center">Let's enter into IOT world</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" className="text-custom-softBlue" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <Label className="block font-bold mb-2 text-base px-2">E-Mail Id</Label>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your College Email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <Label className="block font-bold mb-2 text-base px-2">Password</Label>
              <Input
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter your Password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="bg-emerald-200">Cancel</Button>
          <Button type="submit" form="loginForm" className="bg-custom-cornflowerBlue">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;