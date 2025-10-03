"use client"

import { useFormContext} from "react-hook-form"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { propagateServerField } from "next/dist/server/lib/render-server"


type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>


export function TextAreaWithLabel<S>({
    fieldTitle, nameInSchema, className, ...props
}: Props<S>) {
    const form = useFormContext()

    return (
       <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel 
                    htmlFor={nameInSchema}
                    className="text-base mb-2 ">
                        {fieldTitle}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            id={nameInSchema}
                            className={` disabled:text-blue-500
                                 dark:disabled:text-yellow-300
                                disabled:opacity-75 
                                ${className}`}
                            {...field}
                            {...props}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}