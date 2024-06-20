"use client";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useRouter } from "next/navigation";

const authSchema = z.object({
  username : z.string().min(1, "username is required").max(255),
  password : z.string().min(1, "password is required").max(255),
})

type loginSchema = z.infer<typeof authSchema>;
const Login = () => {
  const router = useRouter();
  const { register, formState:{errors}, handleSubmit } = useForm<loginSchema>({
    resolver: zodResolver(authSchema),
  });
  const submit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("/api/user/login", data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        console.log("Successfully logged in");
        router.push('/');
      } else {
        console.log("Cannot fetch",res.status);
      }
    } catch (error) {
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
          <Button type="submit">Login</Button>
          <Text as="p">New user? <Link className="text-blue-700 hover:text-blue-500" href='/auth/signup'>signup</Link></Text>
        </form>
      </Card>
    </div>
  );
};

export default Login;
