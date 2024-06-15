import { z } from 'zod';

export const issueScheme = z.object({
    title : z.string().min(1, 'Title is required').max(255),
    description : z.string().min(1, 'Description is required').max(255),
})

export const authSchema = z.object({
    username : z.string().min(1, 'Username is required').max(255),
    password : z.string().min(1, 'Password is required').max(255),
    email : z.string().min(1, 'Password is required').max(255),
})