import Button from "@/components/Button"
import ListCategories from "@/components/ListCategories"
import { getProducts } from "@/lib/api/private/products/getProducts"
import getCategories from "@/lib/api/public/category/getCategories"
import CategoriesSection from "./CategoriesSection"

const page = async () => {
    const products = await getProducts()
    const categories = await getCategories()

    return (
        <div className="w-full flex flex-col p-4">
            <CategoriesSection categories={categories}/>
            
            <div className="mt-12">
                <h1 className="text-2xl font-medium">Termékek</h1>
            <table className="flex flex-col gap-2 mt-[8px]">
                <thead>
                    <tr className="w-full flex">
                        <th className="flex-1 text-left">Megnevezés</th>
                        <th className="flex-1 text-left">Ár</th>
                    </tr>
                </thead>
                <tbody className="border border-black/40">
                    {products?.map((product, index) => (
                        <tr className="w-full flex p-2">
                            <td className="flex-1">{product.title}</td>
                            <td className="flex-1">{product.price.toLocaleString()} Ft</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default page