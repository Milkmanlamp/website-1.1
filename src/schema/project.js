import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens and apostrophes",
    ),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens and apostrophes",
    ),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-\+\(\)]{8,20}$/,
      "Please enter a valid phone number (8-20 digits)",
    ),
  package: z.enum(["Basic", "Large"], "Please select a Package"),
  addons: z.string().optional(),
  type: z
    .string()
    .min(2, "Please catagorise your type of Business e.g: Pizza shop"),
  description: z
    .string()
    .min(
      50,
      "Please describle the job so i can make an accurate quote for the work",
    )
    .trim(),
  contact: z.enum(
    ["phone", "email"],
    "Please choose an option so we can contact you",
  ),
});

export default formSchema;

