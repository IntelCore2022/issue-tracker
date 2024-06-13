"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueScheme } from "@/app/valiadtionScheme";

type IssueForm = z.infer<typeof issueScheme>

const IssuePage = () => {
  const [error, setError] = useState<string>("");
  const { register, handleSubmit, control, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(issueScheme)
  });
  const router = useRouter();
  return (
    <div className="max-w-xl space-y-4 pl-5">
      <div>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon/>
            </Callout.Icon>
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>
        )}
      </div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await axios.post("/api/issues", data);
            if (res.data.status !== 400) {
              router.push("/issues");
            } else {
              setError("Enter Valid Issue Details");
            }
          } catch (error) {
            setError("Error occured while creating issue");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <Text as="p" color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>
        {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default IssuePage;
