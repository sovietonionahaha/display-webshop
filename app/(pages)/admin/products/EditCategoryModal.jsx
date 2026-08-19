"use client"

import { deleteCategory } from "@/app/actions/private/category/deleteCategory"
import { editCategory } from "@/app/actions/private/category/editCategory"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useModal } from "@/components/modal/ModalProvider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const EditCategoryModal = ({ initialCategory, categories }) => {
    const [category, setCategory] = useState(initialCategory)

    const router = useRouter()

    const { closeModal } = useModal()

    const handleInputChange = (e) => setCategory(prev => ({ ...prev, [e.target.name]: e.target.value || null }))

    const handleCheckChange = (e) => {
        setCategory(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }

    const handleSubmit = async () => {
        if (await editCategory(category)) {
            closeModal()
            toast.success("Sikeres mentés")
            router.refresh()
        }
    }

    const handleDelete = async () => {
        if (await deleteCategory(category)) {
            closeModal()
            toast.success("Sikeres törlés")
            router.refresh()
        }
    }

    return (
        <div className="w-[400px]">
            <h1 className="font-medium">{category?.title}</h1>
            <div className="flex flex-col gap-2 mt-4">
                <Input name="title" placeholder={"Neve"} type={"text"} onChange={handleInputChange} value={category.title} />
                <Input name="uri" placeholder={"Uri"} type={"text"} onChange={handleInputChange} value={category.uri} />
                <select name='parentId' defaultValue={category.parentId ?? "Szülőkategória"} className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Szülőkategória</option>
                    {categories.filter(x => !x.parentId).map(_category => (
                        <option key={_category.id} value={_category.id}>{_category.title}</option>
                    ))}
                    <option value={''}>Nincs</option>
                </select>
                {category.parentId == null && (
                    <div className='flex gap-2 items-center'>
                        <input name='showInNavigation' type="checkbox" defaultChecked={category.showInNavigation} className="checkbox" onChange={handleCheckChange} />
                        <span>Megjelenítés a navigációban</span>
                    </div>
                )}
            </div>
            <Button onSubmit={handleSubmit} className={"mt-4 w-full"}>Mentés</Button>
            <Button isDelete onSubmit={handleDelete} className={"mt-2 w-full"}>Törlés</Button>
        </div>
    )
}
export default EditCategoryModal