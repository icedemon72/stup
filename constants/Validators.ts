import { z } from 'zod';

// REGISTER STEP-BY-STEP VALIDATION
export const StepTwo = z.object({
  email: 
    z.string({ message: 'E-adresa mora biti tipa string' })
    .email({ message: 'E-adresa nije validna' }),

  password: 
    z.string({ message: 'Lozinka mora biti tipa string' })
    .min(6, { message: 'Lozinka mora sadržati barem 6 karaktera' }),
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
      label: z.string(),
      value: z.number().min(0)
    }),
});

// SURVEYS VALIDATION
export const SurveyInitValidator = z.object({
	title: 
		z.string({ message: 'Naslov mora biti tipa string' })
		.min(1),

	description: 
		z.string({ message: 'Opis mora biti tipa string' })
		.nullable(),

	questionCount: 
		z.number({ message: 'Broj pitanja mora biti broj' })	
		.min(1, { message: 'Najmanji broj pitanja je 1' })
		.max(99, { message: 'Najveći broj pitanja je 99' })
});

export const QuestionRulesValidator = z.object({
	gender:
		z.enum(['ANY', 'M', 'F'], { message: 'Pogrešan unos vrednosti za pol' }),
	
	ageLimit:
		z.array(z.number().min(-1).max(100))
		.refine(data => !(data[0] !== -1 && data[1] !== -1 && data[0] >= data[1]), { message: 'Donja granica ne sme biti veća od gornje' })
});

export const AddQuestionValidator = z.object({
	title:
		z.string({ message: 'Naslov mora biti tipa string' })
		.min(1),

	description:
		z.string({ message: 'Opis mora biti tipa string' })
		.nullable(),

	type:
		z.enum(['single', 'multiple', 'text'], { message: 'Pogrešan unos vrednosti za tip pitanja' }),
	
	isDropdown:
		z.boolean({ message: 'Da li je pitanje "dropdown" mora biti tipa boolean' }),

	required:
		z.boolean({ message: 'Da li je pitanje obavezno mora biti tipa boolean' }),

	answers:
		z.array(z.string({ message: 'Odgovori moraju biti tipa string' }))
}).superRefine((data, ctx) => {
	// @ts-ignore
  if (data.type !== 'text' && !data.answers.length) {
    ctx.addIssue({
      path: ['answers'],
      message: 'Barem jedan odgovor mora postojati',
      code: z.ZodIssueCode.custom
    });
  }
});