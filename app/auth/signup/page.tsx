"use client";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/app/valiadtionScheme";
import { z } from "zod";
import Link from "next/link";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useRouter } from "next/navigation";

type loginSchema = z.infer<typeof authSchema>;
const SignUP = () => {
  const router = useRouter();
  const { register, formState:{errors}, handleSubmit } = useForm<loginSchema>({
    resolver: zodResolver(authSchema),
  });
  const submit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("/api/user/signup", data);
      if (res.data.status !== 400) {
        console.log(res.data)
        localStorage.setItem("token", res.data);
        router.push('/');
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.error("Error occured while signup");
    }
  }
);
  return (
    <div className="h-[32rem] flex justify-center items-center">
      <Card className="w-[22rem]">
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <Text as="p">Email :</Text>
            <TextField.Root
              placeholder="email"
              {...register("email")}
            ></TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
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
          <Button type="submit">Signup</Button>
          <Text as="p">Already existing user? <Link className="text-blue-700 hover:text-blue-500" href='/auth/login'>login</Link></Text>
        </form>
      </Card>
    </div>
  );
};

export default SignUP;
