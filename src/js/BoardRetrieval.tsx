export async function retrieveBoard(dimension: String, difficulty: String, games: String): Promise<any> {
    const url = "http://localhost:8080/generate";

    document.cookie = "dimension=" + dimension;
    document.cookie = "difficulty=" + difficulty;
    document.cookie = "games=" + games;

    const response = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Response status: " + response.status);
    }

    const json = await response.json();
    
    return json;
}
