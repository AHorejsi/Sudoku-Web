import React from "react";

export async function retrieveBoard() {
    const url = "http://127.0.0.1:8080/generate";

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        });

        document.cookie = "dimension=NINE";
        document.cookie = "difficulty=MASTER";
        document.cookie = "games=KILLER,HYPER";

        if (!response.ok) {
            throw new Error("Response status: ${response.status}");
        }

        const json = await response.json();
        
        return (<h1>{json}</h1>);
    }
    catch (error) {
        return (<h1>{error.message}</h1>)
    }
}

