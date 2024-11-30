import { CupCakeIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-5">
      <CupCakeIcon className="text-9xl" />
      <Card>
        <CardContent className="space-y-3">
          <Input type="email" placeholder="Login"></Input>
          <Input type="password" placeholder="Senha"></Input>
          <Button className="w-full">Logar</Button>
          <Button className="w-full">Entrar sem cadastro</Button>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button className="w-full" asChild variant="secondary">
            <Link href="/auth/user/register">
              Cadastro
            </Link>
          </Button>
          <Button className="w-full" variant="secondary">
            <Link href="/auth/employee">
              Area Funcionario
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
