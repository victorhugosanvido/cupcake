"use client"


import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef, RowData } from "@tanstack/react-table"
import { boolean } from "zod";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
   changeStatus: any 
  }
}

export type KeyInfo = {
    key: string;
    role: string;
    isKeyUsed: boolean;
    isKeyActive: boolean;
}

export const columns: ColumnDef<KeyInfo>[] = [
    {
        accessorKey: "activation_key",
        header: "Chave",
        cell: ({ row }) => {
            const text = row.getValue("activation_key");

            if (typeof text !== 'string') {
                return null
            }

            return (
                <ScrollArea className="py-2 max-w-28">
                    {text}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Cargo",
    },
    {
        accessorKey: "is_key_used",
        header: "Usada",
        cell: ({row}) => {
            const isKeyUsed = row.getValue("is_key_used");

            if(typeof isKeyUsed !== "boolean") {
                return null;
            }

            return (
                <div>
                    {isKeyUsed ? "Sim" : "Não"}
                </div>
            )
        } 
    },
    {
        accessorKey: "key_status",
        header: "Ativa",
        cell: ({row}) => {
            const isKeyActive = row.getValue("key_status");

            if(typeof isKeyActive !== "boolean") {
                return null;
            }

            return (
                <div>
                    {isKeyActive ? "Sim" : "Não"}
                </div>
            )
        }
    },
    {
        id: "delete",
        cell: ({row, table}) => {
            const isKeyActive = row.getValue("key_status");
            if(typeof isKeyActive !== "boolean") {
                return null;
            }

            if(table.options.meta?.changeStatus === undefined) {
                return "ERROR";
            }

            return (
                <div>
                    <Button onClick={() => { 
                            table.options.meta?.changeStatus(row.index, !isKeyActive);
                        }} variant={isKeyActive ? "destructive" : "outline"}>{isKeyActive ? "Desativar" : "Ativar"}</Button>
                </div>
                
            )
        }
    }

]