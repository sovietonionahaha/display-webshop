import clsx from 'clsx'
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
    isDelete = false
}) => {
    return (
        <button onClick={onSubmit} disabled={disabled} className={clsx(className, rounded && "rounded-lg", "p-2 cursor-pointer", (primary && !isDelete) && "bg-(--color-primary) text-white", isDelete && "bg-transparent text-red-500")}>
            {children}
        </button>
    )
}

export default Button