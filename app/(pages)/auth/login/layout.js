import { getCurrentUser } from "@/lib/api/public/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function layout({ children }) {
    const user = await getCurrentUser()

    if (!user) return children

    redirect("/admin/products")
}