"use client"

import { CupCakeIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const requiredFieldMessage = 'Esse campo é obrigatorio!'

const formSchema = z.object({
  username: z.string({message: requiredFieldMessage}).min(4, "O nome precisa ter no minimo 4 caracteres!").max(50),
  email: z.string({message: requiredFieldMessage}).email(),
  password: z.string({message: requiredFieldMessage}).min(6).max(20),
  confirmPassword: z.string({message: requiredFieldMessage}).min(2).max(20),
})

type FormFields = z.infer<typeof formSchema>

export default function Register() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-5">
      <CupCakeIcon className="text-9xl" />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>


            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome" {...field}></Input>
                    </FormControl>
                    {form.formState.errors.username && <FormMessage>{form.formState.errors.username.message}</FormMessage>}

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" {...field} placeholder="E-mail"></Input>
                    </FormControl>
                    {form.formState.errors.email && <FormMessage>{form.formState.errors.email.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Senha"></Input>
                    </FormControl>
                    {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Confirmar senha"></Input>
                    </FormControl>
                    {form.formState.errors.confirmPassword && <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col space-y-3">
              <Button type="submit" className="w-full">Cadastrar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
