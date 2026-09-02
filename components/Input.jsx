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
    textarea = false,
    label = false,
}) => {
    const Component = textarea ? "textarea" : "input"

    if (label) return (
        <label className={clsx(textarea ? "textarea" : "input", "w-full")}>
            <span className='text-gray-500'>{placeholder}</span>
            <Component
                name={name}
                type={type}
                {...(value !== null && { value })}
                placeholder={placeholder}
                {...(defaultValue !== null && { defaultValue })}
                className={clsx(className, "grow w-full")}
                onChange={(e) => onChange(e)}
            />
        </label>
    )

    return (
        <Component
            name={name}
            type={type}
            {...(value !== null && { value })}
            placeholder={placeholder}
            {...(defaultValue !== null && { defaultValue })}
            className={clsx(className, textarea ? "textarea" : "input", "w-full")}
            onChange={(e) => onChange(e)}
        />
    )
}

export default Input