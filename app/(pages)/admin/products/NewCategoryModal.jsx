"use client"

import { submitCategory } from '@/app/actions/private/category/submitCategory'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useModal } from '@/components/modal/ModalProvider'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewCategoryModal = ({ categories }) => {
    const router = useRouter()

    const { closeModal } = useModal()

    const [newCategory, setNewCategory] = useState({
        title: "",
        uri: "",
        parent: null,
        showInNavigation: false
    })

    const handleInputChange = (e) => {
        setNewCategory(prev => ({ ...prev, [e.target.name]: e.target.value || null }))
    }

    const handleCheckChange = (e) => {
        setNewCategory(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }

    const handleSubmit = async () => {
        if (await submitCategory(newCategory)) {
            closeModal()
            toast.success("Sikeres mentés")
            router.refresh()
        }

    }

    return (
        <div className='w-[400px]'>
            <h1 className='font-medium'>Új kategória</h1>
            <div className='flex flex-col gap-2 mt-4'>
                <Input onChange={handleInputChange} placeholder={"Neve"} type={"text"} name={"title"} />
                <Input onChange={handleInputChange} placeholder={"Uri"} type={"text"} name={"uri"} />
                <select name='parent' defaultValue="Szülőkategória" className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Szülőkategória</option>
                    {categories.filter(x => !x.parentId).map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                    <option value={''}>Nincs</option>
                </select>
                {newCategory?.parent == null && (
                    <div className='flex gap-2 items-center'>
                        <input name='showInNavigation' type="checkbox" className="checkbox" onChange={handleCheckChange} />
                        <span>Megjelenítés a navigációban</span>
                    </div>
                )}
            </div>
            <Button onSubmit={handleSubmit} className={"mt-4 w-full"}>Mentés</Button>
        </div>
    )
}

export default NewCategoryModal