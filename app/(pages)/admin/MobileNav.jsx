"use client"

import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

const MobileNav = ({ links, children }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="hidden min-h-screen max-lg:flex">
            <aside className={clsx("fixed z-50 flex flex-col min-h-screen w-fit border-r border-(--color-secondary)/50 bg-white", !isOpen && "hidden")}>
                <div className="w-full bg-(--color-secondary) p-4">
                    <h1 className="font-medium">Business Mix Kft.</h1>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    {links?.map(link => (
                        <Link key={link.href} href={`/admin/${link.href}`}>{link.title}</Link>
                    ))}
                </div>
            </aside>
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    )
}
export default MobileNav