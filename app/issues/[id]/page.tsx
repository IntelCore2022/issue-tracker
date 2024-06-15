"use client";
import { useParams, useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueScheme } from "@/app/valiadtionScheme";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof issueScheme>;

interface Issue {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

const UpdateIssuePage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [error, setError] = useState<string>("");
  const [isSubmit, setSubmit] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(issueScheme),
  });

  useEffect(() => {
    if (id) {
      const fetchIssue = async () => {
        try {
          const res = await axios.get(`/api/issues/update?id=${id}`);
          const issueData = res.data;
          setIssue(issueData);
          setValue("title", issueData.title);
          setValue("description", issueData.description);
        } catch (error) {
          console.error(error);
        }
      };
      fetchIssue();
    }
  }, [id, setValue]);

  const submit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      const res = await axios.put(`/api/issues/update?id=${id}`, data);
      if (res.data.status !== 400) {
        router.push("/issues");
      } else {
        setSubmit(false);
        setError("Enter Valid Issue Details");
      }
    } catch (error) {
      setSubmit(false);
      setError("Error occurred while updating issue");
    }
  });

  if (!issue) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-4 pl-5">
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
      <form className="space-y-4" onSubmit={submit}>
        <TextField.Root
         placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} value={field.value} onChange={field.onChange} />
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmit}>
          Update Issue {isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default UpdateIssuePage;