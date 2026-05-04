import { useActivities } from "../myContext"

export const useActivityInput = () => {
    const { inputVal, setInputVal } = useActivities();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const reset = () => setInputVal("");

    return { value: inputVal, onChange, reset };
};


