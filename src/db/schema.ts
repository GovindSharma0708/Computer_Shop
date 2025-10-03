import { pgTable, serial, varchar, boolean, timestamp, integer, text }  from "drizzle-orm/pg-core";
import { desc, relations } from "drizzle-orm";
import { title } from "process";

export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    email: varchar("email").notNull().unique(),
    phone: varchar("phone").unique().notNull(),
    address1: varchar("address1").notNull(),
    address2: varchar("address2"),
    city: varchar("city").notNull(),
    state: varchar("state", {length: 2}).notNull(),
    zip: varchar("zip", {length: 10}).notNull(),
    notes: text("notes"),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().
    $onUpdate(() => new Date()),
});
  
export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(() => customers.id),
    title: varchar("title"),
    description: text("description"),
    completed: boolean("completed").default(false).notNull(),
    tech: varchar("tech").notNull().default("unassigned"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().
    $onUpdate(() => new Date()),
});


// create relations
export const customersRelations = relations(customers,
     ({ many }) => ({
    tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets,
    ({ one }) => ({
    customer: one(customers, {
        fields: [tickets.customerId],
        references: [customers.id],
    }),
}));