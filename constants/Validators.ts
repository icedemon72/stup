import { z } from 'zod';

export const StepTwo = z.object({
  email: 
    z.string({ message: 'E-adresa mora biti tipa string' })
    .email({ message: 'E-adresa nije validna' }),

  password: 
    z.string({ message: 'Lozinka mora biti tipa string' })
    .min(6, { message: 'Lozinka mora sadržati barem 6 karaktera   ' }),
});

export const StepThree = z.object({
  name:
    z.string({ message: 'Ime mora biti tipa string' })
    .nullable(),
  
  dateOfBirth: 
    z.coerce.date().refine((data) => data <= new Date(), { message: "Datum mora biti u prošlosti" }),
});

export const StepFour = z.object({
  faculty: 
    z.object({
      name: z.string(),
      value: z.number().min(0)
    }),
});