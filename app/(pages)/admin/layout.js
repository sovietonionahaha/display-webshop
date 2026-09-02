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
            <aside className="flex flex-col min-h-screen w-fit border-r border-(--color-secondary)/50 bg-(--color-secondary)/10">
                <div className="w-full bg-(--color-secondary) p-4">
                    <h1 className="font-medium">Business Mix Kft.</h1>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    {links?.map(link => (
                        <Link key={link.href} href={`/admin/${link.href}`}>{link.title}</Link>
                    ))}
                </div>
            </aside>
            <main className="flex-1 h-full ">
                {children}
            </main>
        </div>
    )
}
