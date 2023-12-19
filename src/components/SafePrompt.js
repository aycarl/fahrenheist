import React, { useEffect, useState } from "react";

const SafePrompt = ({ value }) => {

    const [promptValue, setPromptValue] = useState("Safe Prompt");

    useEffect(() => {
        setPromptValue(value);
    }, [value]);

    return (
        <div className="safe-prompt">
            <h1>{promptValue}</h1>
        </div>
    )
}

export default SafePrompt;