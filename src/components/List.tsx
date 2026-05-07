import { useState } from 'react';
import { useActivities } from './../myContext';
import ListItem from './ListItem';

interface tabsProps {
    id: number,
    title: string,
}

const List = () => {
    const {
        allActivities,
        activeTab,
        isBeingHovered,  
        setIsBeingHovered,
        setActiveTab,
        concludeEntry,
        resetEntry,
        deleteEntry
    } = useActivities()

    const [tabsInfo] = useState<tabsProps[]>([
        {
            id: 1,
            title: 'Todas',
        },
        {
            id: 2,
            title: 'Pendentes',
        },
        {
            id: 3,
            title: 'Concluídas',
        }
    ])

    return (
        <div className='flex flex-col gap-6 md:w-[50%] lg:w-[50%]'>
            <h3 className='font-bold text-[20px] border-b border-b-orange-400'>Lista de tarefas de hoje</h3>
            <div className='flex justify-between gap-1 border-2 border-white rounded-xl p-1'>
                {tabsInfo.map((item, index) => (
                    <button
                        key={index}
                        className={`transition-all duration-300 ease-in-out 
                                    cursor-pointer rounded-md 
                                    w-full pl-2 pr-2 
                                    ${activeTab === item.id ?
                                'bg-orange-400 font-semibold text-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab(item.id)}>
                        {item.title}
                    </button>
                ))}
            </div>

            <div className='flex flex-col gap-2'>
                {allActivities
                    .filter((item) => {
                        if (activeTab === 1) return true; // Mostra tudo
                        if (activeTab === 2) return !item.isCompleted; // Só pendentes
                        if (activeTab === 3) return item.isCompleted; // Só concluídos
                        return true;
                    })
                    .map((item) => 
                    <ListItem 
                        key={item.id}
                        item={item}
                        isBeingHovered={isBeingHovered === item.id ? item.id : null}
                        setIsBeingHovered={setIsBeingHovered}
                        concludeEntry={concludeEntry} 
                        resetEntry={resetEntry}
                        deleteEntry={deleteEntry}
                    />)  
                }
            </div>

        </div>
    )
}

export default List