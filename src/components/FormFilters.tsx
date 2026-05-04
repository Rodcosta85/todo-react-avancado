import { useState } from 'react';
import React from 'react'
import { useActivities } from '../myContext';
import Add from './../assets/add.svg'

interface tabsProps {
    id: number,
    title: string,
}

const InsertionForm = () => {

    const {
        inputVal,
        addEntry,
        setInputVal,
        handleInputChange,
    } = useActivities()

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        addEntry({
            id: Date.now(),
            title: inputVal,
            isCompleted: false
        })
        setInputVal("");
    }

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-[20px]'>Adicione uma atividade ao seu dia abaixo:</h2>
            <form
                onSubmit={handleSubmit}
                className='flex justify-between gap-6 pt-1.5 pb-1.5 pl-3 pr-1.5
          bg-slate-600 rounded-md'>
                <input
                    type="text"
                    placeholder="digite sua atividade aqui"
                    value={inputVal}
                    onChange={handleInputChange}
                    className='w-full focus:outline-none' />
                <button
                    type='submit'
                    className='flex justify-center items-center 
            w-fit h-fit p-2
            bg-orange-400
            rounded-md
            text-[12px]
            cursor-pointer'>
                    <img src={Add} alt="" />
                </button>
            </form>
        </div>
    )
}

export default InsertionForm