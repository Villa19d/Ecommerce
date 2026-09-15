const ImageGallery = ({photo}) => {
    return (
        <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                    src={photo}
                    alt="Product"
                    className="w-full h-full object-center object-cover"
                />
            </div>
        </div>
    )
}

export default ImageGallery