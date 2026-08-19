"use client"

import { submitCategory } from '@/app/actions/private/category/submitCategory'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewCategoryModal = () => {
    const router = useRouter()
    
    const [newCategory, setNewCategory] = useState({
        title: "",
        uri: "",
    })

    const handleInputChange = (e) => {
        setNewCategory(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        if (await submitCategory(newCategory)) {
            toast.success("Sikeres mentés")
            router.refresh()
        }
        
    }

    return (
        <div>
            <h1 className='font-medium'>Új kategória</h1>
            <div className='flex flex-col gap-2 mt-4'>
                <Input onChange={handleInputChange} placeholder={"Neve"} type={"text"} name={"title"} />
                <Input onChange={handleInputChange} placeholder={"Uri"} type={"text"} name={"uri"} />
            </div>
            <Button onSubmit={handleSubmit} className={"mt-4 w-full"}>Mentés</Button>
        </div>
    )
}

export default NewCategoryModal