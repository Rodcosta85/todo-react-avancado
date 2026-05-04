import { useState } from 'react';
import { useActivities } from './../myContext';
import Check from './../assets/check.svg'

interface tabsProps {
    id: number,
    title: string,
}

const List = () => {
    const [isBeingHovered, setIsBeingHovered] = useState<string | number | null>(null)
    const {
        allActivities,
        finishedActivities,
        activeTab,
        setActiveTab,
        removeEntry,
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
                {(activeTab === 1 || activeTab === 2) &&
                    allActivities.map((item) => {
                        const isHovered = isBeingHovered === item.id

                        return (
                            <button
                                key={item.id}
                                onClick={() => removeEntry(item.id)}
                                onMouseEnter={() => setIsBeingHovered(item.id)}
                                onMouseLeave={() => setIsBeingHovered(null)}
                                className='flex justify-between items-center 
                                        bg-gray-500 p-2.5 rounded-md
                                        cursor-pointer
                                        relative'>
                                <h4>{item.title}</h4>
                                <div
                                    className={`absolute right-0 top-0
                                            flex justify-center items-center
                                            ${isHovered ? 'w-10 opacity-100' : 'w-0 opacity-0'} h-full 
                                            bg-green-700
                                            rounded-tr-sm rounded-br-sm
                                            cursor-pointer 
                                            transition-all duration-300 ease-in-out`}>
                                    <img src={Check} alt="A check symbol" />
                                </div>
                            </button>
                        )
                    })
                }

                {(activeTab === 1 || activeTab === 3) && finishedActivities.map(item => {
                    return (
                        <button
                            key={item.id}
                            className='text-center
                        bg-green-700 p-2.5 rounded-md relative'>
                            <h4>{item.title}</h4>
                        </button>
                    )

                })}
            </div>

        </div>
    )
}

export default List