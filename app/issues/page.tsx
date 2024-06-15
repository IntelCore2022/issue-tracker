'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { issueScheme } from "@/app/valiadtionScheme";
import { z } from "zod";
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type IssueType = {
  id : number,
  title : string,
  description : string
  created_at : string
}
const IssuesPage = () => {
  const router = useRouter()
  const[issues, setIssues] = useState([])
  useEffect( () => {
    const fetchAllIssues = async ()=>{
      try {
        const response = await axios.get('/api/issues')
        setIssues(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllIssues();
  }, [])
  return (
    <div>
      {issues.map((issue : IssueType) => {
        return (
          <div key={issue.id} className='mb-5'>
            <h2>title : {issue.title}</h2>
            <p>description : {issue.description}</p>
            <Button onClick={()=> {
              router.push(`/issues/${issue.id}`)
            }}>Edit</Button>
            <Button>Delete</Button>
          </div>
        )
      })
      }
    </div>
  )
}

export default IssuesPage