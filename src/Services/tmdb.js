
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
        `${BASE_URL}/trending/all/week?language=en-US&page=1`,
        options
    );

    if (!response.ok) {
        throw new Error("ფილმების ჩატვირთვა ვერ მოხერხდა");
    }

    const data = await response.json();
    return data.results;
};





export const getUpcoming = async () => {
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tbilisi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
    const movies = [];

    for (let page = 1; page <= 3 && movies.length < 5; page++) {
        const response = await fetch(
            `${BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
            options
        );

        if (!response.ok) {
            throw new Error("მომავალი ფილმების წამოღება ვერ მოხერხდა");
        }

        const data = await response.json();

        const filteredMovies = data.results.filter(
            (movie) =>
                movie.backdrop_path &&
                movie.release_date >= today
        );

        movies.push(...filteredMovies);
    }

    return movies
        .filter(
            (movie, index, array) =>
                array.findIndex((item) => item.id === movie.id) === index
        )
        .sort((a, b) =>
            a.release_date.localeCompare(b.release_date)
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




export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        options
    );

    if (!response.ok) {
        throw new Error("ძიება ვერ შესრულდა");
    }

    const data = await response.json();

    return data.results.filter(
        (item) =>
            item.media_type === "movie" ||
            item.media_type === "tv"
    );
};
