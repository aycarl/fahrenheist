import React, { useState } from "react";

import SafePrompt from "./SafePrompt";

const GamePage = () => {

    // game logic goes here
    const [promptValue, setPromptValue] = useState(100);


    return (
        <div>
            <h1>Game Page</h1>
            <SafePrompt value={promptValue} />
        </div>
    )
}

export default GamePage;