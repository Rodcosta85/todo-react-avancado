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
    setShowAll: (e: boolean) => void,
    setShowPending: (e: boolean) => void,
    setShowFinished: (e: boolean) => void,
    setActiveTab: (index: number) => void
    setInputVal: (e: string) => void,
    addEntry: (newEntry: activityTypes) => void,
    removeEntry: (id: number) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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

    useEffect(() => {
        localStorage.setItem("my_activities", JSON.stringify(allActivities));
    }, [allActivities]);

    useEffect(() => {
        localStorage.setItem("finished_activities", JSON.stringify(finishedActivities));
    }, [finishedActivities]);

    useEffect(() => {
        localStorage.setItem("deleted_count", deletedCount.toString());
    }, [deletedCount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const addEntry = (newEntry: activityTypes) => {
        // 2. This updates the SAME list that the UI is mapping over
        setAllActivities((prev) => [...prev, newEntry]);
    };

    const removeEntry = (id: number) => {
        const activity = allActivities.find(act => act.id === id);
        setFinishedActivities(prev => [...prev, activity!]);
        setAllActivities((prev) => prev.filter(act => act.id !== id));
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
            setInputVal,
            addEntry,
            setActiveTab,
            removeEntry,
            handleInputChange,
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