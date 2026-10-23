
const BASE_URL = "https://api.themoviedb.org/3";


const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
};

export const getTrending = async () => {
    const pages = await Promise.all(
        [1, 2, 3, 4, 5].map(async (page) => {
            const response = await fetch(
                `${BASE_URL}/trending/all/week?language=en-US&page=${page}`,
                options
            );

            if (!response.ok) {
                throw new Error("ფილმების ჩატვირთვა ვერ მოხერხდა");
            }

            const data = await response.json();
            return data.results;
        })
    );

    return pages.flat().slice(0, 50);
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






export const getDetails = async (mediaType, id) => {
    const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}?language=en-US`,
        options
    );

    if (!response.ok) {
        throw new Error("ფილმის ინფორმაციის ჩატვირთვა ვერ მოხერხდა");
    }

    return response.json();
};

export const getVideos = async (mediaType, id) => {
    const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}/videos?language=en-US`,
        options
    );

    if (!response.ok) {
        throw new Error("თრეილერის ჩატვირთვა ვერ მოხერხდა");
    }

    const data = await response.json();


    const trailer =
        data.results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        ) ||
        data.results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) ||
        data.results.find(
            (video) => video.site === "YouTube"
        );

    return trailer || null;
};


export const getMovies = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}`,
        options
    );

    if (!response.ok) {
        throw new Error("ფილმების ჩატვირთვა ვერ მოხერხდა");
    }

    const data = await response.json();

    return data.results;
};



export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
        options
    );

    if (!response.ok) {
        throw new Error("პოპულარული ფილმების ჩატვირთვა ვერ მოხერხდა");
    }

    const data = await response.json();
    return data.results;
};