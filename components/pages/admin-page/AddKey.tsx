"use client"

import { createNewKey } from "@/actions/employee.actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateRandomString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

const requiredFieldMessage = 'Esse campo é obrigatorio!'

/** @todo fix ponctuation */

const formSchema = z.object({
    role: z.string({ message: requiredFieldMessage }).trim().min(1, requiredFieldMessage),
});

type FormFields = z.infer<typeof formSchema>

/** @todo fix page size on mobile */

export default function AddKey() {
    const [key, setKey] = useState<null | string>(null);
    const [isItemOnClipboard, setIsItemOnClipboard] = useState(false);

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "",
        }
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setKey(null);
            setIsItemOnClipboard(false);
            const tempKey = generateRandomString(100);

            await createNewKey(tempKey, values.role);
            setKey(tempKey);
            toast.success('Chave criada com sucesso!');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="space-y-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um cargo para a nova chave:" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ADM">Administrador</SelectItem>
                                            <SelectItem value="EMPLOYEE">Funcionário</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.role && <FormMessage>{form.formState.errors.role.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        {key !== null ? (
                            <div className="grid grid-cols-4 gap-3">
                                <ScrollArea className="col-span-3 rounded-md border p-3">
                                    {key}
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                                <Button type="button" onClick={async () => {  
                                    await navigator.clipboard.writeText(key);
                                    setIsItemOnClipboard(true);
                                    toast.success('Item copiado!', {
                                        position: "top-center"
                                    });
                                }} className={clsx("h-full", isItemOnClipboard && "bg-blue-600")}>{isItemOnClipboard ? "Copiado" : "Copiar"}</Button>
                            </div>
                        ) : null}
                        <div className="my-5" />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (<Loader2 className="animate-spin" />) : null}
                            Gerar chave
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

