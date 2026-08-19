"use client"

import { signIn } from '@/app/actions/auth'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const [credentails, setCredentails] = useState({
        username: null,
        password: null
    })

    const onInputChange = (e) => {
        setCredentails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        if (!credentails?.username?.trim() || !credentails?.password?.trim()) return

        const result = await signIn(credentails)
        if (result.success) {
            toast.success(result.message)
        }else {
            toast.error(result.message)
        }
    }

    return (
        <div className='w-full flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center p-4 bg-white rounded-lg md:max-w-2/4 xl:max-w-1/4 w-full border border-black/10'>
                <h1 className='text-[#212529] font-medium text-2xl'>Bejelentkezés</h1>
                <div className='flex flex-col gap-2 mt-6 w-full max-w-3/4'>
                    <Input name={"username"} onChange={onInputChange} placeholder={"Felhasználónév"} type={"text"} />
                    <Input name={"password"} onChange={onInputChange} placeholder={"Jelszó"} type={"password"} />
                    <Button className={"mt-2"} onSubmit={handleSubmit}>Bejelentkezés</Button>
                </div>
            </div>
        </div>
    )
}

export default page