'use client';
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const newIssuePage = () => { 
  return (
    <div className="max-w-xl space-y-4 p-5">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description"/>
      <SimpleMDE></SimpleMDE>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssuePage;
