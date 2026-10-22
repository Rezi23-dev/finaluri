
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





export const getUpcoming = async () => {
    const today = new Date().toISOString().slice(0, 10);

    const pages = await Promise.all(
        [1, 2, 3].map(async (page) => {
            const response = await fetch(
                `${BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
                options
            );

            if (!response.ok) {
                throw new Error("მომავალი ფილმების წამოღება ვერ მოხერხდა");
            }

            const data = await response.json();
            return data.results;
        })
    );

    return pages
        .flat()
        .filter(
            (movie) =>
                movie.backdrop_path &&
                movie.release_date >= today
        )
        .sort((a, b) =>
            a.release_date.localeCompare(b.release_date)
        )
        .filter(
            (movie, index, movies) =>
                movies.findIndex((item) => item.id === movie.id) === index
        )
        .slice(0, 5);
};
