import React from 'react'
import type { activityTypes } from '../types'
import Check from './../assets/check.svg'

interface ListItemProps {
    item: activityTypes
    isBeingHovered: string | number | null,
    setIsBeingHovered: (id: number | null) => void,
    updateEntry: (id: number) => void
}

const ListItem: React.FC<ListItemProps> = React.memo(({ item, isBeingHovered, setIsBeingHovered, updateEntry }) => {

    const isHovered = isBeingHovered === item.id;

    return (
        <button
            key={item.id}
            onClick={() => updateEntry(item.id)}
            onMouseEnter={() => setIsBeingHovered(item.id)}
            onMouseLeave={() => setIsBeingHovered(null)}
            className={`flex justify-between items-center p-2.5 rounded-md relative cursor-pointer transition-colors
                    ${item.isCompleted ? 'bg-green-700' : 'bg-gray-500'}`}
        >
            <h4>{item.title}</h4>

            {/* Só mostra o check e o efeito de hover se NÃO estiver concluído */}
            {!item.isCompleted && (
                <div
                    className={`absolute right-0 top-0 flex justify-center items-center
                            ${isHovered ? 'w-10 opacity-100' : 'w-0 opacity-0'} 
                            h-full bg-green-700 rounded-tr-sm rounded-br-sm
                            transition-all duration-300 ease-in-out`}
                >
                    <img src={Check} alt="A check symbol" />
                </div>
            )}
        </button>
    )
})

export default ListItem