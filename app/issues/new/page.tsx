'use client'
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import "easymde/dist/easymde.min.css";
import SimpleMde from "react-simplemde-editor";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4 p-5">
      <TextField.Root placeholder="Title"/>
      <SimpleMde placeholder="Description"/>;
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssuePage;
