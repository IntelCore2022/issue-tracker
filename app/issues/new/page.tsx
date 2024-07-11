"use client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueScheme } from "@/app/valiadtionScheme";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof issueScheme>;

const IssuePage = () => {

  const [error, setError] = useState<string>("");
  const [isSubmit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueScheme),
  });
  const router = useRouter();
  const submit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      const res = await axios.post("/api/issues", data);
      if (res.data.status !== 400) {
        router.push("/issues");
      } else {
        setSubmit(false);
        setError("Enter Valid Issue Details");
      }
    } catch (error) {
      setSubmit(false);
      setError("Error occured while creating issue");
    }
  });
  return (
    <div className="max-w-xl py-5 px-5">
      <div>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </div>
      <form
        className="space-y-4"
        onSubmit={submit}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmit}>Submit New Issue {isSubmit && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default IssuePage;
