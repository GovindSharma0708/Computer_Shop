import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { tickets } from "@/db/schema"

export const insertTicketSchema = createInsertSchema(tickets, {
  // Optional: allow either a number (existing ticket) or the string "New"
  id: () => z.union([z.number(), z.literal("New")]),
  title: (schema: z.ZodString) => schema.min(1, "Title is required"),
  description: (schema: z.ZodString) => schema.min(1, "Description is required"),
  tech: (schema: z.ZodString) => schema.min(1, "Tech is required"),
})

export const selectTicketSchema = createSelectSchema(tickets)

export type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>
export type SelectTicketSchemaType = z.infer<typeof selectTicketSchema>
