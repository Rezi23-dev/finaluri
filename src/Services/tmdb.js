
const BASE_URL = "https://api.themoviedb.org/3";


const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
};

export const getTrending = async () => {
    const response = await fetch(
        `${BASE_URL}/trending/all/week`,
        options
    );

    if (!response.ok) {
        throw new Error("მონაცემების წამოღება ვერ მოხერხდა");
    }

    const data = await response.json();
    return data.results;
};