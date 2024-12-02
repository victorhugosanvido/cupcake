"use client"

import { verifyActivationKeyIsValid } from "@/actions/employee.actions";
import { ChefIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"


/** @todo fix ponctuation */

const formSchema = z.object({
    key: z.string().min(5, 'A chave deve ter no minimo 5 caracteres!').max(100),
});

type FormFields = z.infer<typeof formSchema>

/** @todo fix page size on mobile */

export default function InsertKey() {
    const router = useRouter()

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: "",
        }
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { isKeyValid } = await verifyActivationKeyIsValid(values.key);
        if (!isKeyValid) {
            return toast.error('Key invalida!', {
                position: 'top-center'
            });
        }

        router.push(`/auth/employee/register/${values.key}`);

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
                                            <Input type="text" maxLength={100} {...field} placeholder="Key"></Input>
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
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? (<Loader2 className="animate-spin"/>) : null}
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
