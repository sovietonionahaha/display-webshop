"use client"

import { cloneElement } from "react"
import { toast } from "react-toastify"

const ShareButton = ({ children, title, text, className }) => {
    const handleShare = async () => {
        const url = window.location.href

        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text,
                    url
                })
            } else {
                await navigator.clipboard.writeText(url)
                toast.success("Hivatkozás másolva!")
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error(error)
            }
        }
    }

    return (
        <button
            type="button"
            onClick={handleShare}
            className={className}
        >
            {children}
        </button>
    )
}

export default ShareButton