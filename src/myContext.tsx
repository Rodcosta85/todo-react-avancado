import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { activityTypes } from "./types";

interface MyContextType {
    allActivities: activityTypes[],
    finishedActivities: activityTypes[],
    activeTab: number,
    deletedCount: number,
    inputVal: string,
    showAll: boolean,
    showPending: boolean,
    showFinished: boolean,
    isBeingHovered: string | number | null,
    setIsBeingHovered: (id: string | number | null) => void,
    setShowAll: (e: boolean) => void,
    setShowPending: (e: boolean) => void,
    setShowFinished: (e: boolean) => void,
    setActiveTab: (index: number) => void
    setInputVal: (e: string) => void,
    addEntry: (newEntry: activityTypes) => void,
    updateEntry: (id: number) => void,
    resetData: () => void,
}

export const MyDataContext = createContext<MyContextType | undefined>(undefined);

export const MyContextStates = ({ children }: { children: ReactNode }) => {
    const [allActivities, setAllActivities] = useState<activityTypes[]>(() => {
        const saved = localStorage.getItem("my_activities");
        return saved ? JSON.parse(saved) : [];
    });
    const [finishedActivities, setFinishedActivities] = useState<activityTypes[]>(() => {
        const saved = localStorage.getItem("finished_activities");
        return saved ? JSON.parse(saved) : [];
    });
    const [inputVal, setInputVal] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(1);
    const [deletedCount, setDeletedCount] = useState<number>(() => {
        const savedCount = localStorage.getItem("deleted_count");
        return savedCount ? parseInt(savedCount) : 0;
    });

    const [showAll, setShowAll] = useState<boolean>(true);
    const [showPending, setShowPending] = useState<boolean>(false);
    const [showFinished, setShowFinished] = useState<boolean>(false);
    const [isBeingHovered, setIsBeingHovered] = useState<string | number | null>(null)

    useEffect(() => {
        localStorage.setItem("my_activities", JSON.stringify(allActivities));
    }, [allActivities]);

    useEffect(() => {
        localStorage.setItem("finished_activities", JSON.stringify(finishedActivities));
    }, [finishedActivities]);

    useEffect(() => {
        localStorage.setItem("deleted_count", deletedCount.toString());
    }, [deletedCount]);

    const addEntry = (newEntry: activityTypes) => {
        setAllActivities((prev) => [...prev, newEntry]);
    };

    const updateEntry = (id: number) => {
        setAllActivities((prev) =>
            prev.map(activity => {
                if (activity.id === id) {
                    // Se for o ID que clicamos, retorna uma cópia com isCompleted true
                    return { ...activity, isCompleted: true };
                }
                // Se não for o ID clicado, retorna a atividade sem mexer nela
                return activity;
            })
        );

        // Atualiza o contador (se o exercício pedir para contar apenas novas conclusões)
        setDeletedCount((prev) => prev + 1);
    };

    const resetData = () => {
        setAllActivities([])
        setFinishedActivities([])
        setDeletedCount(0)
    }

    return (
        <MyDataContext.Provider value={{
            allActivities,
            deletedCount,
            activeTab,
            inputVal: inputVal,
            finishedActivities,
            showAll,
            showPending,
            showFinished,
            isBeingHovered,
            setIsBeingHovered,
            setInputVal,
            addEntry,
            setActiveTab,
            updateEntry,
            resetData,
            setShowAll,
            setShowPending,
            setShowFinished,
        }}>
            {children}
        </MyDataContext.Provider>
    );
};

export const useActivities = () => {
    const context = useContext(MyDataContext);
    if (!context) throw new Error("Forgot to wrap the Provider!");
    return context;
};