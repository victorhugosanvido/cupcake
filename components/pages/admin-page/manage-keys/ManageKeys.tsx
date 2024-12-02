"use client"

import { useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getKeys } from "@/actions/employee.actions"

export default function ManageKeys() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({ queryKey: ['getKeys'], queryFn: getKeys})


    if(isLoading) {
        return null
    }

    console.log(data);

    return (
        <div className="container mx-auto py-10 ">
            <DataTable changeStatus={(index: number, status: boolean) => console.log("test")} columns={columns as any} data={data} />
        </div>
    )
}