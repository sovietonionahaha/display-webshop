import Button from "@/components/Button"
import ListCategories from "@/components/ListCategories"
import { getProducts } from "@/lib/api/private/products/getProducts"
import CategoriesSection from "./CategoriesSection"
import { getCategories } from "@/lib/api/private/category/getCategories"
import ProductsSection from "./ProductsSection"

const page = async () => {
    const products = await getProducts()
    const categories = await getCategories()

    return (
        <div className="w-full flex flex-col p-4">
            <CategoriesSection categories={categories} />

            <ProductsSection products={products} categories={categories}/>
        </div>
    )
}

export default page