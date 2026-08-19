"use client"

const ProductsSection = ({ products }) => {
    return (
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
                        <tr key={product.id} className="w-full flex p-2">
                            <td className="flex-1">{product.title}</td>
                            <td className="flex-1">{product.price.toLocaleString()} Ft</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ProductsSection