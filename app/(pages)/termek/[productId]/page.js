import getProduct from "@/lib/api/public/products/getProduct"
import { MdOutlineImageNotSupported } from "react-icons/md"
import ImageViewer from "./ImageViewer"
import Link from "next/link"
import { SlArrowRight } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import ListProducts from "@/components/ListProducts";
import ShareButton from "@/components/ShareButton";
import { PiShareFatLight } from "react-icons/pi";

export async function generateMetadata({params, searchParams}, parent) {
    const productId = (await params).productId

    const product = await getProduct(productId)

    return {
        title: product.title,
        description: product.description
    }
}

const page = async ({ params }) => {
    const { productId } = await params

    const product = await getProduct(productId)

    return (
        <div className="mx-auto mt-4 lg:mt-16 w-full max-w-11/12 lg:max-w-4/6 flex flex-col">
            <div className="mb-4 lg:mb-8 flex gap-2 text-[15px]">
                <span className="flex items-center gap-2">
                    <Link href={"/"}>Termékek</Link>
                    <SlArrowRight size={10} />
                </span>
                {product?.category?.parent && (
                    <span className="flex items-center gap-2">
                        <Link href={`/kategoriak/${product.category.uri}`}>{product.category.parent.title}</Link>
                        <SlArrowRight size={10} />
                    </span>
                )}
                {product?.category && (
                    <span className="flex items-center gap-2">
                        <Link href={`/kategoriak/${product.category.uri}`}>{product.category.title}</Link>
                        <SlArrowRight size={10} />
                    </span>
                )}
                <span className="underline">{product.title}</span>
            </div>
            <div className="w-full flex max-lg:flex-col gap-8 lg:gap-16">
                <div className="w-full lg:w-2/4 flex">
                    {product.images.length > 0 ? (
                        <ImageViewer images={product.images} alt={product.title} />
                    ) : (
                        <div className="w-full bg-slate-100 min-h-[320px] flex items-center justify-center">
                            <MdOutlineImageNotSupported size={40} className="text-gray-400" />
                        </div>
                    )}
                </div>
                <div className="lg:w-2/4 flex flex-col">
                    <div className="flex w-full">
                        <div className="flex grow">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-medium">{product?.title}</h1>
                                <div className="flex gap-2">
                                    <span className="text-xl">{product.discountPrice.toLocaleString()} Ft</span>
                                    {product?.discountPercent > 0 && <span className="text-xl line-through text-black/40">{product.price.toLocaleString()} Ft</span>}
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex gap-2 items-center hidden">
                            <a href="tel:+36704224626" className="bg-(--color-primary) text-white flex items-center h-fit gap-2 py-2 px-3 cursor-pointer rounded-full border border-black/40">
                                <IoCallOutline size={20} />
                                <h1>Érdeklődés telefonon</h1>
                            </a>
                            <ShareButton className={"flex items-center h-fit gap-2 py-2 px-3 cursor-pointer rounded-full border border-black/40"} title={product.title} text={`Nézd meg ezt a terméket: ${product.title}`}>
                                <PiShareFatLight size={20} />
                                <h1>Megosztás</h1>
                            </ShareButton>
                        </div>
                    </div>
                    <p className="prose mt-8">
                        {product.description}
                    </p>
                </div>
                <div className="flex gap-2 items-center lg:hidden">
                    <a href="tel:+36704224626" className="bg-(--color-primary) text-white flex items-center h-fit gap-2 py-2 px-3 cursor-pointer rounded-full border border-black/40">
                        <IoCallOutline size={20} />
                        <h1>Érdeklődés telefonon</h1>
                    </a>
                    <ShareButton className={"flex items-center h-fit gap-2 py-2 px-3 cursor-pointer rounded-full border border-black/40"} title={product.title} text={`Nézd meg ezt a terméket: ${product.title}`}>
                        <PiShareFatLight size={20} />
                        <h1>Megosztás</h1>
                    </ShareButton>
                </div>
            </div>
            <div className="max-lg:mt-10 lg:mt-20 flex w-full items-center">
                <span className="flex-1 h-[1px] bg-black/30"></span>
                <span className="px-4 text-xl font-medium text-black/80">További termékek</span>
                <span className="flex-1 h-[1px] bg-black/30"></span>
            </div>
            <div className="my-8">
                <ListProducts excludeId={product.id} />
            </div>
        </div>
    )
}
export default page