import { z } from "zod"
import { customers } from "@/db/schema"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema: z.ZodString) => schema.min(1, "First name is required"),
  lastName: (schema: z.ZodString) => schema.min(1, "Last name is required"),
  address1: (schema: z.ZodString) => schema.min(1, "Address is required"),
  city: (schema: z.ZodString) => schema.min(1, "City is required"),
  state: (schema: z.ZodString) =>
    schema.length(2, "State must be 2 characters"),
  zip: (schema: z.ZodString) =>
    schema.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code. Zip must be 5 digits"),
  email: (schema: z.ZodString) =>
    schema.email("Invalid email address").min(1, "Email is required"),
  phone: (schema: z.ZodString) =>
    schema.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Expected: XXX-XXX-XXXX"
    ),
})

export const selectCustomerSchema = createSelectSchema(customers)

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>
