import { CupCakeIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-5">
      <CupCakeIcon className="text-9xl"/>
      <Card>
        <CardContent className="space-y-3">
          <Input placeholder="Nome"></Input>
          <Input type="email" placeholder="E-mail"></Input>
          <Input type="password" placeholder="Senha"></Input>
          <Input type="password" placeholder="Confirmar senha"></Input>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button className="w-full" variant="secondary">Cadastrar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
