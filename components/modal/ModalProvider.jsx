"use client"

import clsx from "clsx";
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [modal, setModal] = useState({
        open: false,
        content: null,
        transparent: false,
    })

    const openModal = (content, transparent = false) => {
        setModal({
            open: true,
            content,
            transparent
        })
    }

    const closeModal = () => {
        setModal({
            open: false,
            content: null
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
                    <div onClick={(e) => e.stopPropagation()} className={clsx("py-6 px-12 rounded-xl min-w-[300px]", modal.transparent ? "" : "bg-white")}>
                        {modal.content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)