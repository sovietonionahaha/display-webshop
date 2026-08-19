import clsx from 'clsx'
import React from 'react'

const Input = ({
    placeholder,
    onChange,
    defaultValue,
    type,
    name,
    className,
    value,
}) => {
    return (
        <input
            name={name}
            type={type}
            {...(value !== null && { value })}
            placeholder={placeholder}
            className={clsx(className, "input w-full")}
            onChange={(e) => onChange(e)}
        />
    )
}

export default Input