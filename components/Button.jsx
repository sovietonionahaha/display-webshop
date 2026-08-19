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
}) => {
    return (
        <button onClick={onSubmit} disabled={disabled} className={clsx(className, rounded && "rounded-lg", "p-2 cursor-pointer", primary && "bg-(--color-primary) text-white")}>
            {children}
        </button>
  )
}

export default Button