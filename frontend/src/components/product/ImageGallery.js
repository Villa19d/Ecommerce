const ImageGallery = ({photo}) => {
    console.log("[IMAGE CHECKPOINT 1] ImageGallery received photo prop:", photo);
    let imgSrc = photo;
    if (imgSrc) {
        if (!imgSrc.startsWith("http")) {
            // It's a relative path. Prepend the API URL.
            imgSrc = process.env.REACT_APP_API_URL + imgSrc;
            console.log("[IMAGE CHECKPOINT 2] Prepended API URL. New path:", imgSrc);
        } else {
            console.log("[IMAGE CHECKPOINT 2] Image URL is already absolute:", imgSrc);
        }
    }
    
    console.log("[IMAGE CHECKPOINT 3] Final image src to be rendered:", imgSrc);
    
    return (
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 min-h-[300px] flex items-center justify-center">
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt="Product"
                    className="w-full h-auto object-cover"
                    onLoad={() => console.log("[IMAGE CHECKPOINT 4] Image successfully loaded!")}
                    onError={(e) => console.error("[IMAGE CHECKPOINT ERROR] Image failed to load!", e)}
                />
            ) : (
                <span className="text-gray-400">Cargando imagen...</span>
            )}
        </div>
    )
}

export default ImageGallery