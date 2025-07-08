import { z } from 'zod';

export const CategorySchema = z.object({
  code: z.string().max(50),       
  icon: z.string().max(255).optional(), 
  name: z.string().max(50),
});


