"use client"

import { editProduct } from "@/app/actions/private/product/editProduct"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRef, useState } from "react"
import { CiImageOn } from "react-icons/ci"
import { IoMdCloseCircle } from "react-icons/io"
import { VscLoading } from "react-icons/vsc"
import { toast } from "react-toastify"

const ProductDetails = ({ product: initial, categories }) => {
    const [product, setProduct] = useState(initial)

    const handleInputChange = (e) => setProduct(prev => ({ ...prev, [e.target.name]: e.target.value || e.target.checked || null }))

    if (!product) return <VscLoading size={20} />

    const fileInputRef = useRef(null)

    const handleSubmit = async () => {
        if (await editProduct(product)) return toast.success("Sikeres módosítás")
    }

    return (
        <div className="flex flex-col ml-8">
            <input type="file" ref={fileInputRef} accept='image/*' multiple className='hidden' onChange={(e) => setProduct(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files)] }))} />
            {product.images.length > 0 ? (
                <>
                    <span onClick={() => fileInputRef.current?.click()} className='border border-black/20 text-black/40 py-1 px-2 text-sm w-fit rounded-sm cursor-pointer'>
                        Feltöltés
                    </span>
                    <div className='grid grid-cols-4 lg:grid-cols-8 gap-2 pb-2 my-4'>
                        {product.images.map((file, index) => (
                            <span key={file.name || file.path} className='relative'>
                                <img src={file?.id ? `https://cdn.sovietprojects.hu/get/business/${file.path}` : URL.createObjectURL(file)} alt="File" className='w-full h-full rounded-sm object-contain' />
                                <IoMdCloseCircle onClick={() => setProduct(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))} size={20} className='absolute right-1 top-1 text-gray-200 cursor-pointer' />
                            </span>
                        ))}
                    </div>
                </>
            ) : (
                <div onClick={() => fileInputRef.current?.click()} className='flex flex-col items-center border border-black/20 text-black/50 p-4 rounded-sm cursor-pointer max-w-[300px] my-4'>
                    <CiImageOn size={30} />
                    <h1 className='mt-3'>Kép feltöltés</h1>
                </div>
            )}
            <h1 className='font-medium text-2xl'>{product.title}</h1>
            <div className="flex flex-col gap-2 mt-6 max-w-md">
                <Input label name={"title"} defaultValue={product.title} onChange={handleInputChange} placeholder={"Megnevezés"} type={"text"} />
                <Input label name={"price"} defaultValue={product.price} onChange={handleInputChange} placeholder={"Ár"} type={"number"} />
                <Input label name={"description"} defaultValue={product.description} onChange={handleInputChange} placeholder={"Leírás"} type={"text"} textarea />
                <Input label name={"discountPercent"} defaultValue={product.discountPercent} onChange={handleInputChange} placeholder={"Kedvezmény %"} type={"number"} />
                <select name='categoryId' defaultValue={product?.categoryId || "Kategória"} className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Kategória</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                    <option value={''}>Nincs</option>
                </select>
                <select name='condition' defaultValue={product.condition || "Állapot"} className="select w-full" onChange={handleInputChange}>
                    <option disabled={true}>Állapot</option>
                    <option value="NEW">Új</option>
                    <option value="NOVEL">Újszerű</option>
                    <option value="USED">Használt</option>
                </select>
                <div className='flex gap-2 items-center'>
                    <input name='enabled' type="checkbox" className="checkbox" defaultChecked={product.enabled} onChange={handleInputChange} />
                    <span>Engedélyezve</span>
                </div>
                <div className="flex gap-4 mt-4">
                    <Button isDelete href={"/admin/products"}>Mégse</Button>
                    <Button onSubmit={handleSubmit}>Módosítás</Button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails