"use client"

import { submitCategory } from '@/app/actions/private/category/submitCategory'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useModal } from '@/components/modal/ModalProvider'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NewCategoryModal from './NewCategoryModal'
import EditCategoryModal from './EditCategoryModal'
import { PiHashStraightLight } from "react-icons/pi";

const CategoriesSection = ({ categories }) => {
    const { openModal } = useModal()

    const handleModal = () => openModal(<NewCategoryModal categories={categories} />)

    const handleEditModal = (category) => openModal(<EditCategoryModal initialCategory={category} categories={categories}/>)

    return (
        <>
            <div className="flex flex-col">
                <h1 className="font-medium">Kategóriák</h1>
                <div className="flex flex-col mt-4">
                    {categories.filter(x => x.parentId == null).map(category => (
                        <div key={category.uri} className="p-2">
                            <span className='flex gap-1 cursor-pointer items-center' onClick={() => handleEditModal(category)}>
                                <PiHashStraightLight size={15} className='text-black/40'/>
                                {category.title}
                            </span>
                            {category?.children?.length > 0 && (
                                <div className='flex flex-col border-l border-black/20 ml-2 mt-3 gap-1'>
                                    {category.children.map(children => (
                                        <span key={children.id} className=' text-black/80 ml-4 cursor-pointer' onClick={() => handleEditModal(children)}>{children.title}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <Button className={"w-[150px] mt-4"} onSubmit={handleModal} rounded={false}>Új kategória</Button>
            </div>
        </>
    )

    /* return (
        <>
            <div className="flex flex-col">
                <h1 className="font-medium">Kategóriák</h1>
                <div className="grid grid-cols-12 gap-2 mt-3">
                    {categories.map(category => (
                        <div key={category.uri} className="border border-black/40 p-2 cursor-pointer" onClick={() => handleEditModal(category)}>
                            <h1>{category.title}</h1>
                        </div>
                    ))}
                    <Button onSubmit={handleModal} rounded={false}>Új</Button>
                </div>
            </div>
        </>
    ) */
}

export default CategoriesSection