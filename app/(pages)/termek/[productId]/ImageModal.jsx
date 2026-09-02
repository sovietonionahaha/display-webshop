"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"

const ImageModal = ({ images }) => {

    const [selected, setSelected] = useState(0)

    const goBack = () => {
        setSelected(prev => prev == 0 ? images.length - 1 : prev - 1)
    }

    const goForward = () => {
        setSelected(prev => prev == (images.length - 1) ? 0 : prev + 1)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") goBack()
            if (e.key === "ArrowRight") goForward()
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <div className={clsx("w-full flex items-center justify-center relative h-screen bg-black rounded-sm select-none overflow-hidden")}>
            <Image src={`https://cdn.sovietprojects.hu/get/business/${images[selected]?.path}`} width={200} height={200} className="z-10 blur-xl scale-120 object-cover absolute w-full h-full" />
            <MdOutlineArrowBackIos onClick={goBack} size={45} className="z-12 absolute left-1.5 text-black ring-transparent ring rounded-full p-3 bg-gray-200 cursor-pointer" />
            <Image className="w-full h-full object-contain rounded-sm z-11" src={`https://cdn.sovietprojects.hu/get/business/${images[selected]?.path}`} width={1000} height={1000} alt="Termék kép" />
            <MdOutlineArrowForwardIos onClick={goForward} size={45} className="z-12 absolute right-1.5 text-black ring-transparent ring rounded-full p-3 bg-gray-200 cursor-pointer" />
            <div className="absolute bottom-2 z-13 flex gap-2">
                {images.map((image, index) => (
                    <Image onClick={() => setSelected(index)} src={`https://cdn.sovietprojects.hu/get/business/${image.path}`} className={clsx("w-12 h-12 aspect-square object-cover cursor-pointer rounded-sm", index !== selected && "opacity-50")} width={75} height={75} />
                ))}
            </div>
        </div>
    )
}
export default ImageModal