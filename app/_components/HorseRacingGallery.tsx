
const HorseRacingGallery = () => {
    const images = [
        { id: 1, src: '/galleryImages/431760198_914435477349477_7385562689024648570_n.png' },
        { id: 2, src: '/galleryImages/Doctor Jay Races Home.png' },
        { id: 3, src: '/galleryImages/Doctor Jay Winning Post.png' },
        { id: 4, src: '/galleryImages/Don\'t Trust Judas.png' },
        { id: 5, src: '/galleryImages/Ice Pick Nick_10-08-2024_WIN_Belmont_9__51_750x500px.png' },
        { id: 6, src: '/galleryImages/Ice Pick Nick_10-08-2024_WIN_Belmont_9__52_750x500px.png' },
        { id: 7, src: '/galleryImages/Ice Pick Nick_10-08-2024_WIN_Belmont_9__54_750x500px.png' },
        { id: 8, src: '/galleryImages/IMG_6066.png' },
        { id: 9, src: '/galleryImages/IMG_6067.png' },
        { id: 10, src: '/galleryImages/IMG_6068.png' },
        { id: 11, src: '/galleryImages/IMG_6069.png' },
        { id: 12, src: '/galleryImages/Lord Lala.png' },
        { id: 13, src: '/galleryImages/Percussion Prince_05-05-2024_WIN_Northam_3__06_750x438px.png' },
        { id: 14, src: '/galleryImages/Percussion Prince_05-05-2024_WIN_Northam_3__08_750x438px.png' },
        { id: 15, src: '/galleryImages/Soldanelle_31-01-2024_WIN_Ascot_7__07_750x437px.png' },
        { id: 16, src: '/galleryImages/Vandoula Jet Trackwork 3.png' },
        { id: 17, src: '/galleryImages/Allegro SOnata.png' },
        { id: 18, src: '/galleryImages/Allegro Sonata_10-08-2023_WIN_Northam_6__01_750x500px.png' },
        { id: 19, src: '/galleryImages/Allegro Sonata_29-05-2024_WIN_Belmont_7__05_750x438px.png' },
        { id: 20, src: '/galleryImages/Allegro Sonata_29-05-2024_WIN_Belmont_7__07_750x438px.png' },
        { id: 21, src: '/galleryImages/Aztec RUler.png' },
        { id: 22, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__04_750x500px.png' },
        { id: 23, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__51_750x938px (3).png' },
        { id: 24, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__57_750x500px (2).png' },
        { id: 25, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__59_750x500px.png' },
        { id: 26, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__69_750x500px.png' },
        { id: 27, src: '/galleryImages/Aztec Ruler_09-03-2024_WIN_Bunbury_7__77_750x938px.png' },
        { id: 28, src: '/galleryImages/Doctor Jay Leads.png' },
        { id: 29, src: '/galleryImages/Doctor Jay Post Win.png' },
    ];

    return (
        <div className="">
            <div className="max-w-7xl mx-auto my-6 lg:my-14">
                <h1 className="text-3xl font-bold text-[#1ADB04] mb-6">Horse Racing Gallery</h1>

                {/* Masonry Grid Layout */}
                <div className="columns-2 md:columns-3 2xl:columns-4 gap-2 space-y-2">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="break-inside-avoid mb-2"
                        >
                            <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                {/* Image automatically maintains its natural aspect ratio */}
                                <img
                                    src={image.src}
                                    alt={`Horse racing photo ${image.id}`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 hover:bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                                        Photo {image.id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HorseRacingGallery;