import React from 'react'
import type { activityTypes } from '../types'
import Check from './../assets/check.svg'
import Reset from './../assets/reset-history.svg'
import Delete from './../assets/delete.svg'

interface ListItemProps {
    item: activityTypes
    isBeingHovered: string | number | null,
    setIsBeingHovered: (id: number | null) => void,
    concludeEntry: (id: number) => void,
    resetEntry: (id: number) => void,
    deleteEntry: (id: number) => void
}

const ListItem: React.FC<ListItemProps> = React.memo(({
    item,
    isBeingHovered,
    setIsBeingHovered,
    concludeEntry,
    resetEntry,
    deleteEntry
}) => {

    const isHovered = isBeingHovered === item.id;

    return (
        <div className='flex items-center w-full h-10 rounded-tl-md rounded-bl-md overflow-hidden'>
            <div
                onMouseEnter={() => setIsBeingHovered(item.id)}
                onMouseLeave={() => setIsBeingHovered(null)}
                className={`relative 
                w-full h-full
                transition-colors
                ${item.isCompleted ? 'bg-green-700' : 'bg-gray-500'}`}
            >
                <h4 className='p-2'>{item.title}</h4>

                {/* Só mostra o check e o efeito de hover se NÃO estiver concluído */}
                {!item.isCompleted && (
                    <button
                        title="Concluir tarefa"
                        aria-label="Concluir tarefa"
                        onClick={() => concludeEntry(item.id)}
                        className={`absolute right-0 top-0 flex justify-center items-center
                            ${isHovered ? 'w-10 opacity-100' : 'w-0 opacity-0'} 
                            h-full bg-green-700
                            transition-all duration-300 ease-in-out
                            cursor-pointer`}
                    >
                        <img src={Check} alt="A check symbol" />
                    </button>
                )}

                {/* Só mostra o check e o efeito de hover se estiver concluído */}
                {item.isCompleted && (
                    <button
                        title="Marcar como pendente"
                        aria-label="Marcar como pendente"
                        onClick={() => resetEntry(item.id)}
                        className={`absolute right-0 top-0 flex justify-center items-center
                            ${isHovered ? 'w-10 opacity-100' : 'w-0 opacity-0'} 
                            h-full bg-gray-400
                            transition-all duration-300 ease-in-out
                            cursor-pointer`}
                    >
                        <img src={Reset} alt="A reset/refresh symbol" />
                    </button>
                )}
            </div>
            {/* botão de deletar a tarefa de forma total */}
            <button
                title="Excluir tarefa"
                aria-label="Excluir tarefa"
                onClick={() => deleteEntry(item.id)}
                className={`flex justify-center items-center 
                w-10 h-full 
                bg-red-500 rounded-tr-sm rounded-br-sm
                transition-all duration-300 ease-in-out
                cursor-pointer`}>
                <img src={Delete} alt="a delete icon" />
            </button>
        </div>

    )
})

export default ListItem