"use client"

import { submitProduct } from '@/app/actions/private/product/submitProduct'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useModal } from '@/components/modal/ModalProvider'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CiImageOn } from "react-icons/ci";
import { IoMdCloseCircle } from 'react-icons/io'

const NewProductModal = ({ categories }) => {
    const router = useRouter()

    const { closeModal } = useModal()

    const [newProduct, setNewProduct] = useState({
        title: "",
        enabled: true,
        price: 0,
        description: "",
        condition: "NEW",
        categoryId: null,
        files: []
    })

    const handleInputChange = (e) => {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value || null }))
    }

    const handleCheckChange = (e) => {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }

    const handleSubmit = async () => {
        if (await submitProduct(newProduct)) {
            closeModal()
            toast.success("Sikeres mentés")
            router.refresh()
        }

    }

    const fileInputRef = useRef(null)

    return (
        <div className='w-[400px]'>
            <h1 className='font-medium'>Új termék</h1>
            <div className='flex flex-col gap-2 mt-4'>
                <input type="file" ref={fileInputRef} accept='image/*' multiple className='hidden' onChange={(e) => setNewProduct(prev => ({ ...prev, files: [...prev.files, ...Array.from(e.target.files)] }))} />
                {newProduct.files.length > 0 ? (
                    <>
                        <span onClick={() => fileInputRef.current?.click()} className='border border-black/20 text-black/40 py-1 px-2 text-sm w-fit rounded-sm cursor-pointer'>
                            Feltöltés
                        </span>
                        <div className='grid grid-cols-3 gap-2 pb-2 border-b border-black/10'>
                            {newProduct.files.map((file, index) => (
                                <span key={file.name} className='relative'>
                                    <img src={URL.createObjectURL(file)} alt="File" className='w-full h-full rounded-sm object-cover' />
                                    <IoMdCloseCircle onClick={() => setNewProduct(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))} size={20} className='absolute right-1 top-1 text-gray-200 cursor-pointer' />
                                </span>
                            ))}
                        </div>
                    </>
                ) : (
                    <div onClick={() => fileInputRef.current?.click()} className='flex flex-col items-center border border-black/20 text-black/50 p-4 rounded-sm cursor-pointer'>
                        <CiImageOn size={30} />
                        <h1 className='mt-3'>Kép feltöltés</h1>
                    </div>
                )}
                <Input onChange={handleInputChange} placeholder={"Megnevezés"} type={"text"} name={"title"} />
                <Input onChange={handleInputChange} placeholder={"Ár"} type={"number"} name={"price"} />
                <Input onChange={handleInputChange} textarea placeholder={"Leírás"} type={"text"} name={"description"} />
                <select name='categoryId' defaultValue="Kategória" className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Kategória</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                    <option value={''}>Nincs</option>
                </select>
                <select name='condition' defaultValue="Állapot" className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Állapot</option>
                    <option value="NEW">Új</option>
                    <option value="NOVEL">Újszerű</option>
                    <option value="USED">Használt</option>
                </select>
            </div>
            <Button onSubmit={handleSubmit} className={"mt-4 w-full"}>Mentés</Button>
        </div >
    )
}

export default NewProductModal