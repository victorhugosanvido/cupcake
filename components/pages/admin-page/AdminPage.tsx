'use client'

import { useState } from "react";
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import AddCupcake from "./AddCupcake"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import AddKey from "./AddKey";
import ManageKeys from "./manage-keys/ManageKeys";

export default function AdminPage() {
    const auth = useAuth();
    const router = useRouter()

    const [openDialog, setOpenDialog] = useState(false);

    const onLogoutPress = () => {
        auth.signOut();
        router.push('/auth/employee');
    }

    return (
        <div className="flex items-center justify-center h-screen flex-col space-y-5">
            <Card>
                <CardContent className="space-y-3">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button className="w-full"> Adicionar um Cupcake ao catalogo </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adicionar um Cupcake</DialogTitle>
                                <DialogDescription>
                                    Preencha os campos para adicionar o cupcake.
                                </DialogDescription>
                                <AddCupcake triggerSuccessOrFail={setOpenDialog} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full"> Criar uma chave de criação de conta </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar uma chave</DialogTitle>
                                <DialogDescription>
                                    Selecione o cargo desejado, e depois aperte o botão para criar uma nova chave
                                </DialogDescription>
                                <AddKey />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">Gerenciar chaves</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Gerenciar chaves</DialogTitle>
                                <DialogDescription>
                                   placeholdergoogobolder 
                                </DialogDescription>
                                <ManageKeys/>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </CardContent>

                <CardFooter>
                    <Button onClick={onLogoutPress} className="w-full" variant="outline"> Deslogar </Button>
                </CardFooter>
            </Card>
        </div>
    )
}