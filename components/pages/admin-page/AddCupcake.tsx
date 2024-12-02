"use client"

import { createCupcake } from "@/actions/cupcakes.actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

const requiredFieldMessage = 'Esse campo é obrigatorio!'
const minLenghtMessage = (lenght: number) => `Esse campo precisa ter no minimo ${lenght} caracteres!`;

/** @todo fix ponctuation */

const formSchema = z.object({
    cupcakeName: z.string({ message: requiredFieldMessage }).min(5, minLenghtMessage(5)),
    cupcakeDescription: z.string({ message: requiredFieldMessage }).min(5, minLenghtMessage(5)),
    cupcakeNutritionalValue: z.string({ message: requiredFieldMessage }).min(5, minLenghtMessage(5)),
    cupcakeIngredients: z.string({ message: requiredFieldMessage }).min(5, minLenghtMessage(5)),
    cupcakePrice: z.coerce.number().min(2, minLenghtMessage(2)).multipleOf(0.01),
    cupcakeImage: z.any()
});

type FormFields = z.infer<typeof formSchema>

/** @todo fix page size on mobile */


type AddCupcakeProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    triggerSuccessOrFail?: any;
}

export default function AddCupcake({ triggerSuccessOrFail }: AddCupcakeProps) {

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cupcakeName: "",
            cupcakeDescription: "",
            cupcakeNutritionalValue: "",
            cupcakeIngredients: "",
            cupcakePrice: 0
        }
    });

    const cupcakeImage = form.watch('cupcakeImage');

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createCupcake(values.cupcakeName, values.cupcakeDescription, values.cupcakeNutritionalValue, values.cupcakeIngredients, values.cupcakeImage[0], values.cupcakePrice);
            if (triggerSuccessOrFail !== undefined) {
                triggerSuccessOrFail(false);
                toast.success('Cupcake criado com sucesso!', {
                    position: 'top-center'
                })
            }
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
                            name="cupcakeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input maxLength={100} type="text" {...field} placeholder="Nome do cupcake"></Input>
                                    </FormControl>
                                    {form.formState.errors.cupcakeName && <FormMessage>{form.formState.errors.cupcakeName.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cupcakeDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" {...field} maxLength={300} placeholder="Descrição do cupcake"></Input>
                                    </FormControl>
                                    {form.formState.errors.cupcakeDescription && <FormMessage>{form.formState.errors.cupcakeDescription.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cupcakeNutritionalValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" {...field} maxLength={300} placeholder="Valores nutricionais do cupcake"></Input>
                                    </FormControl>
                                    {form.formState.errors.cupcakeNutritionalValue && <FormMessage>{form.formState.errors.cupcakeNutritionalValue.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cupcakeIngredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" {...field} maxLength={300} placeholder="Ingredientes do cupcake"></Input>
                                    </FormControl>
                                    {form.formState.errors.cupcakeIngredients && <FormMessage>{form.formState.errors.cupcakeIngredients.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cupcakePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" {...field} maxLength={10} placeholder="Preço do cupcake"></Input>
                                    </FormControl>
                                    {form.formState.errors.cupcakePrice && <FormMessage>{form.formState.errors.cupcakePrice.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <div>
                            <input className="hidden" type="file" id="file" {...form.register('cupcakeImage')} accept="image/*"></input>
                            <label className="border-gray-400 border border-dashed rounded p-2 text-sm text-gray-600 w-full" htmlFor="file">
                                {cupcakeImage?.[0]?.name ?? 'Selecionar uma imagem para o cupcake'}
                            </label>
                        </div>
                        <div className="my-5" />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (<Loader2 className="animate-spin" />) : null}
                            Criar cupcake
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

