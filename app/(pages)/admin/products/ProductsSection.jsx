"use client"

import Button from "@/components/Button"
import { useModal } from "@/components/modal/ModalProvider"
import NewProductModal from "./NewProductModal"
import Link from "next/link"
import { useEffect, useState } from "react"
import Input from "@/components/Input"

const ProductsSection = ({ products: initial, categories }) => {
    const { openModal } = useModal()

    const [filteredProducts, setFilteredProducts] = useState(initial)

    const [search, setSearch] = useState(null)

    const handleModal = () => openModal(<NewProductModal categories={categories} />)

    const handleInputChange = (e) => setSearch(e.target.value)

    useEffect(() => {
        if (!search?.trim() || !search) return setFilteredProducts(initial)
 
        if (search.length >= 2) {
            setFilteredProducts(prev => prev.filter(x => x.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search])

    return (
        <div className="mt-12">
            <h1 className="text-2xl font-medium">Termékek</h1>
            <Input onChange={handleInputChange} placeholder={"Keresés..."} className={"rounded-none border-black/30 border my-6 max-w-[300px]"} />
            <table className="flex flex-col gap-2 mt-[8px]">
                <thead>
                    <tr className="w-full flex">
                        <th className="flex w-10 text-left">#</th>
                        <th className="flex-1 text-left">Megnevezés</th>
                        <th className="flex-1 text-left">Ár</th>
                        <th className="flex-1 text-left">Kedvezmény %</th>
                        <th className="flex-1 text-left">Kategória</th>
                    </tr>
                </thead>
                <tbody className="border border-black/40 divide-y divide-black/10">
                    {filteredProducts?.map((product, index) => (
                        <tr key={product.id} className="w-full flex p-2">
                            <td className="flex w-10">{index + 1}.</td>
                            <td className="flex-1">
                                <Link href={`/admin/products/${product.id}`}>{product.title}</Link>
                            </td>
                            <td className="flex-1">{product.discountPrice.toLocaleString()} Ft</td>
                            <td className="flex-1">{product.discountPercent}</td>
                            <td className="flex-1">{product?.category?.title || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button className={"w-[150px] mt-4"} onSubmit={handleModal} rounded={false}>Új termék</Button>
        </div>
    )
}
export default ProductsSection