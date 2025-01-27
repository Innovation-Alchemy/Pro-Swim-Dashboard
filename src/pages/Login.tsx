import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import { loginFormSchema } from "../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  useNavigate } from "react-router-dom";
import { TextFormField } from "../components/TextFormField";
import { FormBackground } from "../components/index";
import axios from "axios";
import { useState } from "react";
import logo from "../../public/logo.png";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Helper functions for userId management
  function storeUserId(userId: string | number) {
    localStorage.setItem("userId", userId.toString());
  }

  // function getUserId() {
  //   return localStorage.getItem("userId");
  // }

  // function clearUserId() {
  //   localStorage.removeItem("userId");
  // }
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remmemberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setError(null); // Clear previous error
      const response = await axios.post("https://shop.proswim-lb.com/api/auth/signin", {
        email: values.email,
        password: values.password,
        role: "admin", // Assuming "admin" is the role
      });
  
      if (response.data.success) {
        // Store user details and token in localStorage
        const { userId, token } = response.data.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", "admin"); // Save the role for additional checks if needed
  
        console.log("Login successful", response.data);
        navigate("/"); // Redirect to home page
      } else {
        // Handle unexpected structure
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err: any) {
      // Set error message on failed login
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show backend message
      } else {
        setError("An error occurred. Please try again."); // Fallback message
      }
    }
  }

  return (
    <FormBackground>
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" />
        <div className="flex items-center justify-center gap-4 text-2xl">
          {/* <img src={loginAnimation} alt="login" className="w-9 h-12" /> */}
          {/* <span>Login</span> */}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TextFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
          <TextFormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />
          <div className="flex justify-center items-center gap-5">
            {/* <FormField
              control={form.control}
              name="remmemberMe"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remmemberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="remmemberMe" className="select-none">
                    Remember me
                  </label>
                </div>
              )}
            /> */}
            {/* <Link to={"/"} className="text-primary text-sm">
              Forgot password ?
            </Link> */}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full text-xl text-white">
            Login
          </Button>
        </form>
      </Form>
      {/* <div className="flex items-center gap-5 px-0.5">
        <span className="flex-1 h-0.5 bg-gray-400"></span>
        <span className="text-gray-500">Or Login With</span>
        <span className="flex-1 h-0.5 bg-gray-400"></span>
      </div>
      <GoogleButton /> */}
      {/* <p className="text-sm text-center">
        Don't have an account ?
        <Link to={"/signup"} className="text-primary font-bold ml-2">
          Sign Up
        </Link>
      </p> */}
    </FormBackground>
  );
};

export default Login;