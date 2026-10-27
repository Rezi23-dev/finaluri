
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

const OptimizedImage = ({
    path,
    alt = "",
    size = "w342",
    width,
    height,
    className,
    loading = "lazy",
    fetchPriority,
    ...props
}) => {
    if (!path) return null;

    const src = path.startsWith("http")
        ? path
        : `${TMDB_IMAGE_URL}/${size}${path}`;

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
            {...props}
        />
    );
};

export default OptimizedImage;
