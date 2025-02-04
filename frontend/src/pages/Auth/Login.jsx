import React, { useEffect, useState } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader } from 'react-spinners';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-custom-cornflowerBlue to-custom-deepBlue p-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl md:text-3xl lg:text-3xl text-custom-deepBlue pt-3">Login to the Application</CardTitle>
          <CardDescription className="text-custom-deepBlue text-lg md:text-xl lg:text-xl font-medium flex justify-center">Let's enter into IOT world</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" className="text-custom-deepBlue" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2">E-Mail Id</Label>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your College Email"
              />
              {errors.email && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.email.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2">Password</Label>
              <Input
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter your Password"
              />
              {errors.password && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.password.message}</p>}
            </div>            
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mb-4">
          <Button
            className="w-full md:w-72 lg:w-96 bg-custom-softBlue text-white hover:bg-custom-deepBlue md:text-lg"
            onClick={() => navigate('/register')}
          >Register</Button>
          <Button type="submit" form="loginForm" className="w-full md:w-72 lg:w-96 bg-custom-softBlue text-white hover:bg-custom-deepBlue md:text-lg">
          {loading && <FadeLoader color="#FFFFF" loading={loading} size={35} />}
          {!loading && 'Login'}
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default Login;