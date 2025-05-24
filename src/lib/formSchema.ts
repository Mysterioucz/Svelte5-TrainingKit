import { z } from 'zod';

export const addFormSchema = z.object({
    name:z.string().min(3),
    priceInCents: z.number({coerce: true}),
    description: z.string().min(5),
    file: z.instanceof(File, {message: 'Please upload a file'}).refine((f)=> f.size > 0, 'Required'),
    image: z.instanceof(File).refine((f)=> f.size > 0 || f.type.startsWith('image/'), 'max 100kb upload size')
});