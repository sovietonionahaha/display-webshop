"use client"

import clsx from "clsx";
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [modal, setModal] = useState({
        open: false,
        content: null,
        transparent: false,
        fullWidthOnMobile: false
    })

    const openModal = (content, transparent = false, fullWidthOnMobile = false) => {
        setModal({
            open: true,
            content,
            transparent,
            fullWidthOnMobile
        })
    }

    const closeModal = () => {
        setModal({
            open: false,
            content: null,
            transparent: false,
            fullWidthOnMobile: false
        })
    }

    useEffect(() => {
        if (modal.open) {
            const handleKeyDown = (e) => {
                if (e.key == "Escape") return closeModal()
            }

            window.addEventListener("keydown", handleKeyDown)

            return () => {
                window.removeEventListener("keydown", handleKeyDown)
            }
        }
    }, [modal])

    useEffect(() => {
        if (modal.open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [modal.open])

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            {children}

            {modal.open && (
                <div onClick={closeModal} className={clsx("fixed inset-0 z-50 flex items-center justify-center", modal.transparent ? "bg-black/80" : "bg-black/50")}>
                    <div onClick={(e) => e.stopPropagation()} className={clsx("rounded-xl min-w-[300px]", modal.transparent ? "" : "bg-white", modal.fullWidthOnMobile ? "w-full" : "px-12 py-6", modal.fullWidthOnMobile && "h-full")}>
                        {modal.content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)