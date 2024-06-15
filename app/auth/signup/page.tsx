"use client";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/app/valiadtionScheme";
import { z } from "zod";
import Link from "next/link";

type loginSchema = z.infer<typeof authSchema>;
const Login = () => {
  const { register } = useForm<loginSchema>({
    resolver: zodResolver(authSchema),
  });
  return (
    <div className="h-[32rem] flex justify-center items-center">
      <Card className="w-[22rem]">
        <form className="space-y-4">
          <div>
            <Text as="p">Email :</Text>
            <TextField.Root
              placeholder="email"
              {...register("email")}
            ></TextField.Root>
          </div>
          <div>
            <Text as="p">Username :</Text>
            <TextField.Root
              placeholder="username"
              {...register("username")}
            ></TextField.Root>
          </div>
          <div>
            <Text as="p">Passwrod :</Text>
            <TextField.Root
              placeholder="password"
              {...register("password")}
            ></TextField.Root>
          </div>
          <Button>Signup</Button>
          <Text as="p">Already existing user? <Link className="text-blue-700 hover:text-blue-500" href='/auth/login'>login</Link></Text>
        </form>
      </Card>
    </div>
  );
};

export default Login;
