"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Markdown from 'react-markdown';

type IssueType = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

const IssuesPage = () => {
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const response = await axios.get("/api/issues");
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllIssues();
  }, []);
  return (
    <div className="p-5">
      <Table.Root>
        <Table.Header >
          <Table.Row >
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Options</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {issues.map((issue: IssueType) => {
          return (
            <Table.Row key={issue.id}>
              <Table.Cell className="w-[10rem]">{issue.title}</Table.Cell>
              <Table.Cell className=""><Markdown>{issue.description}</Markdown></Table.Cell>
              <Table.Cell className="w-[18rem]">
                <Button
                  color="green"
                  onClick={() => {
                    router.push(`/issues/${issue.id}`);
                  }}
                >
                  Edit
                </Button>
                <span className="mx-4"></span>
                <Button
                  color="red"
                  onClick={async () => {
                    const id = issue.id;
                    await axios
                      .delete("/api/issues", { data: { id } })
                      .then(() =>
                        setIssues(
                          issues.filter((issue: IssueType) => issue.id != id)
                        )
                      );
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
