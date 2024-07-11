"use client";
import { Button, Card, Spinner, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import Link from "next/link";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useState } from "react";

const authSchema = z.object({
  username : z.string().min(1, "username is required").max(255),
  password : z.string().min(1, "password is required").max(255),
})

type loginSchema = z.infer<typeof authSchema>;
const Login = () => {
  const [isSubmit, setSubmit] = useState(false);
  const[error, setError] = useState<string>("")
  const { register, formState:{errors}, handleSubmit } = useForm<loginSchema>({
    resolver: zodResolver(authSchema),
  });
  const submit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      const res = await axios.post("/api/user/login", data);
      console.log(res.data);
      if (res.data.status === 200) {
        setError("");
        console.log("Successfully logged in");
        window.location.href = "/";
      } else {
        setSubmit(false);
        setError("Please enter valid credentials");
        console.log("Cannot fetch",res.data.status);
      }
    } catch (error) {
      setSubmit(false);
      console.error("Error occured while login");
    }
  }
);
  return (
    <div className="h-[32rem] flex justify-center items-center">
      <Card className="w-[22rem]">
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <Text as="p">Username :</Text>
            <TextField.Root
              placeholder="username"
              {...register("username")}
            ></TextField.Root>
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          </div>
          <div>
            <Text as="p">Passwrod :</Text>
            <TextField.Root
              placeholder="password"
              {...register("password")}
            ></TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <Button type="submit" disabled={isSubmit}>Login {isSubmit && <Spinner/>}</Button>
          <Text as="p" color="red">{error}</Text>
          <Text as="p">New user? <Link className="text-blue-700 hover:text-blue-500" href='/auth/signup'>signup</Link></Text>
        </form>
      </Card>
    </div>
  );
};

export default Login;
