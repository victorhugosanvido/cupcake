"use client"

import { ChefIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod"


/** @todo fix ponctuation */

const formSchema = z.object({
    key: z.string(),
});

type FormFields = z.infer<typeof formSchema>

/** @todo fix page size on mobile */

export default function Register() {
    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: "",
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="flex items-center justify-center h-screen flex-col space-y-5">
            <ChefIcon className="text-9xl" />
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <CardHeader className="text-center text-2xl font-bold">
                            Insira a key
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" {...field} placeholder="Key"></Input>
                                        </FormControl>
                                        {form.formState.errors.key && <FormMessage>{form.formState.errors.key.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex-col space-y-3">
                            <div className="flex w-full space-x-3">
                                <Button variant="outline" size="icon" asChild>
                                    <Link href="/">
                                        <ArrowLeft />
                                    </Link>
                                </Button>
                                <Button className="w-full">
                                   Começar cadastro 
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
