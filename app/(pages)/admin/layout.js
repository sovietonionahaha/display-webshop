import { getCurrentUser } from "@/lib/api/public/auth/getCurrentUser"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function layout({ children }) {

    const user = await getCurrentUser()

    if (!user) redirect("/auth/login")

    const links = [
        {
            title: "Termékek",
            href: "/products",
        },
    ]

    return (
        <div className="min-h-screen lg:flex">
            <aside className="flex flex-col min-h-screen w-fit p-4 bg-(--color-secondary)">
                <h1>Adminisztráció</h1>
                <div className="flex flex-col gap-2">
                    {links?.map(link => (
                        <Link key={link.href} href={link.href}>{link.title}</Link>
                    ))}
                </div>
            </aside>
            <main className="flex-1 h-full ">
                {children}
            </main>
        </div>
    )
}
