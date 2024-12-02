'use client'

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import AddCupcake from "./AddCupcake"

export default function AdminPage() {
    return (
        <div className="flex items-center justify-center h-screen flex-col space-y-5">
            <Dialog>
                <DialogTrigger asChild>
                    <Button> Adicionar CupCake ao catalogo </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar um CupCake</DialogTitle>
                        <DialogDescription>
                           Preencha os campos para adicionar o cupcake. 
                        </DialogDescription>
                        <AddCupcake/> 
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}