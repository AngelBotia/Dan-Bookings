import { z } from 'zod';

export const userAuthSchema = z.object({
    id:z.string().regex(/^\d+$/).refine((val) => val.length <= 100),
    name: z.string().min(1).max(250),
    email: z.string().email().min(1).max(250),
  });