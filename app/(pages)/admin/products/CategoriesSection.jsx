"use client"

import { submitCategory } from '@/app/actions/private/category/submitCategory'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useModal } from '@/components/modal/ModalProvider'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NewCategoryModal from './NewCategoryModal'
import EditCategoryModal from './EditCategoryModal'

const CategoriesSection = ({ categories }) => {
    const { openModal } = useModal()

    const handleModal = () => openModal(<NewCategoryModal />)

    const handleEditModal = () => openModal(<EditCategoryModal />)

    return (
        <>
            <div className="flex flex-col">
                <h1 className="font-medium">Kategóriák</h1>
                <div className="grid grid-cols-12 gap-2 mt-3">
                    {categories.map(category => (
                        <div key={category.uri} className="border border-black/40 p-2 cursor-pointer" onClick={handleEditModal}>
                            <h1>{category.title}</h1>
                        </div>
                    ))}
                    <Button onSubmit={handleModal} rounded={false}>Új</Button>
                </div>
            </div>
        </>
    )
}

export default CategoriesSection