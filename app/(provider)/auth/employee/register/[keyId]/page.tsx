"use client"

import { createNewUser } from "@/actions/employee.actions";
import { ChefIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/configs/firebase";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

const requiredFieldMessage = 'Esse campo é obrigatorio!'
const minLenghtMessage = (lenght: number) => `Esse campo precisa ter no minimo ${lenght} caracteres!`;

/** @todo fix ponctuation */

const formSchema = z.object({
  username: z.string({ message: requiredFieldMessage }).min(4, minLenghtMessage(4)).max(40),
  email: z.string({ message: requiredFieldMessage }).email({ message: "Esse campo precisa ser um email valido!" }),
  password: z.string({ message: requiredFieldMessage }).min(6, minLenghtMessage(6)).regex(
    /^(?=(.*[A-Z]){1,}).{1,}$/g,
    "Senha precisa de no mínimo 1 caractere maiusculo!"
  ).regex(
    /^(?=(.*[!@#$%^&*()\-__+.]){1,}).{1,}$/g,
    "Senha precisa de no mínimo 1 caractere especial!"
  ).max(20),
  confirmPassword: z.string({ message: requiredFieldMessage }).max(20),
}).refine((data) => data.password === data.confirmPassword && data.confirmPassword.length !== 0, {
  message: "As senhas não são iguais!",
  path: ["confirmPassword"], // path of error
});

type FormFields = z.infer<typeof formSchema>

/** @todo fix page size on mobile */

export default function RegisterEmployee() {
  const router = useRouter()
  const {signIn, setUserInformation} = useAuth();
  const { keyId } = useParams<{ 'keyId': string; }>()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, name, role }= await createNewUser(keyId, values.username, values.email);
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);

      signIn(await res.user.getIdToken());
      setUserInformation({
        email,
        name,
        role 
      });
      
      router.push('/home');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code == "auth/email-already-in-use") {
          return toast.error('Uma conta com esse email já existe.', {
            position: 'top-center'
          });
        }
      }

      if(error instanceof AxiosError) {
        if(error.response?.data.statusMessage === 'Activation key is invalid.') {
            return toast.error('Key invalida!', {
                position: 'top-center'
            });
        }
        console.log(error.response?.data);
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-5">
      <ChefIcon className="text-9xl" />
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
                      <Input placeholder="Nome" maxLength={40} {...field}></Input>
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
                      <Input type="password" {...field} maxLength={20} placeholder="Senha"></Input>
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
                      <Input type="password" {...field} maxLength={20} placeholder="Confirmar senha"></Input>
                    </FormControl>
                    {form.formState.errors.confirmPassword && <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/auth/employee/insert-key">
                  <ArrowLeft />
                </Link>
              </Button>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (<Loader2 className="animate-spin"/>) : null}
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}