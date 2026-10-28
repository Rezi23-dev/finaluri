
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
    sizes = "(max-width: 600px) 42vw, (max-width: 900px) 25vw, 220px",
    ...props
}) => {
    if (!path) return null;

    const isAbsoluteUrl = /^https?:\/\//i.test(path);
    const isLocalPath = path.startsWith("/");

    const src = isAbsoluteUrl
        ? path
        : isLocalPath
            ? path
            : `${TMDB_IMAGE_URL}/${size}${path}`;

    const isTmdbImage = !isAbsoluteUrl && !isLocalPath;

    const srcSet = isTmdbImage
        ? [
            `${TMDB_IMAGE_URL}/w185${path} 185w`,
            `${TMDB_IMAGE_URL}/w342${path} 342w`,
        ].join(", ")
        : undefined;

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
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
