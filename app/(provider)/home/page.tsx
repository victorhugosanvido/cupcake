'use client'
import AdminPage from "@/components/pages/admin-page/AdminPage";
import { useAuth } from "@/hooks/useAuth"


export default function Home() {
    const auth = useAuth();

    if(auth?.userInformation?.role === 'ADM') {
        return (
           <AdminPage/> 
        )
    }


    return (
        <div>
            <p> Testing </p>
        </div>
    )
}