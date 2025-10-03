"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import {
  insertTicketSchema,
  type InsertTicketSchemaType,
  type SelectTicketSchemaType,
} from "@/zod-schemas/ticket";

import { SelectCustomerSchemaType } from "@/zod-schemas/customer";

type Props = {
  customer: SelectCustomerSchemaType;
  ticket?: SelectTicketSchemaType;
  techs?: { id: string; description: string }[];
  isEditable?: boolean;
};

export default function TicketForm({
  ticket,
  customer,
  techs,
  isEditable = true,
}: Props) {
  // ✅ default values typed correctly

  const isManager = Array.isArray(techs);

  const defaultValues: InsertTicketSchemaType = {
    id: ticket?.id ?? "New", // "New" or number only
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "unassigned",
  };

  const form = useForm<InsertTicketSchemaType>({
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function submitForm(data: InsertTicketSchemaType) {
    console.log("Submitted data:", data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <h2 className="text-2xl font-bold">
        {ticket?.id && isEditable
          ? `Edit Ticket #${ticket.id}`
          : ticket?.id
            ? `View Ticket #${ticket.id}`
            : "New Ticket Form"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 md:gap-8"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
              {...form.register("title")}
            />
            {isManager ? (
              <SelectWithLabel<InsertTicketSchemaType>
                fieldTitle="Tech ID"
                nameInSchema="tech"
                data={[
                  {
                    id: "new-ticket@example.com",
                    description: "new-ticket@example.com",
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<InsertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<InsertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>Phone: {customer.phone}</p>
              <p>Email: {customer.email}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<InsertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
              {...form.register("description")}
            />

            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => form.reset(defaultValues)} // ✅ matches type now
                >
                  Reset
                </Button>
              </div>
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)} // ✅ matches type now
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
