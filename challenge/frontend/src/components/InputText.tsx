import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

type InputTextProps = {
    title: string;
    register: UseFormRegister<any>;
    name: string;
    defaultTopic?: string;
};

const InputText = ({ title, register, name, defaultTopic }: InputTextProps) => {
    const [topic, setTopics] = useState(defaultTopic ?? "");

    return (
        <p className="flex flex-row items-center">
            <p className="w-32">
                {title}
            </p>
            <input
                {...register(name)}
                value={topic}
                onChange={(t) => {
                    setTopics(t.currentTarget.value);
                }}
                className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 focus:outline-none focus:ring-primary focus:border-primary text-xs"
                autoComplete="off"
            ></input>

        </p>
    );
};

export default InputText;
