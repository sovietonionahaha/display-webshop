"use client"

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const Button = ({
    onSubmit,
    children,
    primary = true,
    secondary,
    ghost,
    className,
    disabled,
    rounded = true,
    isDelete = false,
    href = null
}) => {
    const Component = href ? Link : "button"

    return (
        <Component {...(href && { href })} onClick={onSubmit} disabled={disabled} className={clsx(className, rounded && "rounded-lg", "p-2 cursor-pointer", (primary && !isDelete) && "bg-(--color-primary) text-white", isDelete && "bg-transparent text-red-500")}>
            {children}
        </Component>
    )
}

export default Button