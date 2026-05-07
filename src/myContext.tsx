import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { activityTypes } from "./types";

interface MyContextType {
    allActivities: activityTypes[],
    finishedActivities: activityTypes[],
    activeTab: number,
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
    concludeEntry: (id: number) => void,
    resetEntry: (id: number) => void,
    deleteEntry: (id: number) => void,
    resetApp: () => void
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

    const addEntry = (newEntry: activityTypes) => {
        setAllActivities((prev) => [...prev, newEntry]);
    };

    const concludeEntry = (id: number) => {
        setAllActivities((prev) =>
            prev.map(activity => {
                if (activity.id === id) {
                    return { ...activity, isCompleted: true };
                }
                return activity;
            })
        );
    };

    const resetEntry = (id: number) => {
        setAllActivities((prev) =>
            prev.map(activity => {
                if (activity.id === id) {
                    return { ...activity, isCompleted: false };
                }
                return activity;
            })
        );
    }

    const deleteEntry = (id: number) => {
        const filteredItem = allActivities.find(item => item.id === id);
        if (!filteredItem) return;
        const remaningList = allActivities.filter(item => item.id !== id);
        setAllActivities(remaningList);
    }

    const resetApp = () => {
        setAllActivities([])
    }

    return (
        <MyDataContext.Provider value={{
            allActivities,
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
            concludeEntry,
            resetEntry,
            deleteEntry,
            setShowAll,
            setShowPending,
            setShowFinished,
            resetApp
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