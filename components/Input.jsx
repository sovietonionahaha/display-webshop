import clsx from 'clsx'
import React from 'react'

const Input = ({
    placeholder,
    onChange,
    defaultValue,
    type,
    name,
    className
}) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={clsx(className, "input w-full")}
            onChange={(e) => onChange(e)}
        />
    )
}

export default Input