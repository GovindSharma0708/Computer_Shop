"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import {
  insertCustomerSchema,
  type InsertCustomerSchemaType,
  type SelectCustomerSchemaType,
} from "@/zod-schemas/customer"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { StatesArray } from "@/constants/StatesArray"


type Props = {
  customer?: SelectCustomerSchemaType
}

export default function CustomerForm({ customer }: Props) {
  

  const { getPermission, isLoading} = useKindeBrowserClient()

  if(isLoading) return <div>Loading...</div>
  
  const isManager = !isLoading && getPermission("manager")?.isGranted
  

  // Use Partial type to allow optional fields when editing
  const defaultValues: InsertCustomerSchemaType = {
  id: customer?.id ?? 0,
  firstName: customer?.firstName ?? "",
  lastName: customer?.lastName ?? "",
  address1: customer?.address1 ?? "",
  address2: customer?.address2 ?? "",
  city: customer?.city ?? "",
  state: customer?.state ?? "",
  zip: customer?.zip ?? "",
  phone: customer?.phone ?? "",
  email: customer?.email ?? "",
  notes: customer?.notes ?? "",
  active: customer?.active ?? true,
}


  const form = useForm<InsertCustomerSchemaType>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
    mode: "onBlur", // Validate on blur
  })

  async function submitForm(data: InsertCustomerSchemaType) {
    console.log("Submitted data:", data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
        {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `#${customer.id}` : "Form"}
      </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 md:gap-8"
        >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName"
                placeholder="Enter first name"
                {...form.register("firstName")}
              />
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName"
                placeholder="Enter last name"
                {...form.register("lastName")}
                />  
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1"
                placeholder="Enter address line 1"
                {...form.register("address1")}
                />
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2"
                placeholder="Enter address line 2"
                {...form.register("address2")}
                />
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="City"
                nameInSchema="city"
                placeholder="Enter city"
                {...form.register("city")}
                />

                <SelectWithLabel<InsertCustomerSchemaType>
                fieldTitle="State"
                nameInSchema="state"
                data={StatesArray}
                className=""
                {...form.register("state")}
                /> 
              
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Zip Code"
                nameInSchema="zip"
                placeholder="Enter zip code"
                {...form.register("zip")}
                />
                <InputWithLabel<InsertCustomerSchemaType>   
                fieldTitle="Email"  
                nameInSchema="email"
                placeholder="Enter email"
                {...form.register("email")}
                />
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Phone"
                nameInSchema="phone"
                placeholder="Enter phone number"
                {...form.register("phone")}
                />
                <TextAreaWithLabel<InsertCustomerSchemaType>
                fieldTitle="Notes"
                nameInSchema="notes"
                className="h-24"
                placeholder="Enter notes"
                {...form.register("notes")}
                />
                {isLoading ? <p>Loading...</p> : isManager && customer?.id ? (
                <CheckboxWithLabel<InsertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
                {...form.register("active")}
                />
                ) : null}
                

                <div className="flex gap-2">
                    <Button type="submit"
                     className="w-3/4"
                     variant="default"
                     title="Save">   
                        Save
                    </Button>
                    <Button 
                    type="button" 
                    variant="destructive"
                    title="Reset"
                    onClick={() => form.reset(defaultValues)}
                    >
                        Reset
                    </Button>
                </div>
                

            </div>
        </form>

        
      </Form>
    </div>
  )
}
