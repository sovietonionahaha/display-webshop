"use client"

import Button from "@/components/Button"
import { useModal } from "@/components/modal/ModalProvider"
import NewProductModal from "./NewProductModal"
import Link from "next/link"

const ProductsSection = ({ products, categories }) => {
    const { openModal } = useModal()

    const handleModal = () => openModal(<NewProductModal categories={categories} />)

    return (
        <div className="mt-12">
            <h1 className="text-2xl font-medium">Termékek</h1>
            <table className="flex flex-col gap-2 mt-[8px]">
                <thead>
                    <tr className="w-full flex">
                        <th className="flex-1 text-left">Megnevezés</th>
                        <th className="flex-1 text-left">Ár</th>
                        <th className="flex-1 text-left">Kategória</th>
                    </tr>
                </thead>
                <tbody className="border border-black/40 divide-y divide-black/10">
                    {products?.map((product, index) => (
                        <tr key={product.id} className="w-full flex p-2">
                            <td className="flex-1">
                                <Link href={`/admin/products/${product.id}`}>{product.title}</Link>
                            </td>
                            <td className="flex-1">{product.price.toLocaleString()} Ft</td>
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