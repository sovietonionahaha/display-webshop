"use client"

import { createContext, useContext, useState } from "react";

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [modal, setModal] = useState({
        open: false,
        content: null
    })

    const openModal = (content) => {
        setModal({
            open: true,
            content
        })
    }

    const closeModal = () => {
        setModal({
            open: false,
            content: null
        })
    }

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            {children}

            {modal.open && (
                <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white py-6 px-12 rounded-xl min-w-[300px]">
                        {modal.content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)