import Navbar from "@/components/Navbar";
import getCategories from "@/lib/api/public/category/getCategories";
import ListCategories from "../../components/ListCategories";
import ListProducts from "@/components/ListProducts";
import Footer from "@/components/Footer";

export default async function Home() {

    const categories = await getCategories()
    return (
        <>
            <Navbar />
            <div className="w-full max-w-4/6 mx-auto flex-1 flex-col mt-[64px]">
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-2xl font-medium">Kategóriák</h1>
                    <ListCategories/>
                </div>
                <div className="flex flex-col w-full mt-4 bg-(--color-secondary)">
                    <ListProducts/>
                </div>
            </div>
            <Footer/>
        </>
    );
}
