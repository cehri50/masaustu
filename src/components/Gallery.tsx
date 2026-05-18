import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, ZoomIn } from "lucide-react";
import { useState } from "react";

interface Photo {
  id: number;
  url: string;
  title: string;
  category: string;
}

interface GalleryProps {
  onSelectBackground: (url: string) => void;
}

const photos: Photo[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1620050861113-11b332304899?q=80&w=2600&auto=format&fit=crop", title: "Üç Güzeller Peri Bacaları", category: "Doğa" },
  { id: 2, url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2600&auto=format&fit=crop", title: "İstanbul'un Ruhu", category: "Şehir" },
  { id: 3, url: "https://images.unsplash.com/photo-1627393433364-15f10660a92f?q=80&w=2600&auto=format&fit=crop", title: "Vatan Destanı", category: "Vatan" },
  { id: 4, url: "https://images.unsplash.com/photo-1565108940217-063f41fc86ab?q=80&w=2000&auto=format&fit=crop", title: "Anıtkabir Saygı", category: "Vatan" },
  { id: 5, url: "https://images.unsplash.com/photo-1555995835-09a52191aac4?q=80&w=2600&auto=format&fit=crop", title: "Çanakkale Geçilmez", category: "Destan" },
  { id: 6, url: "https://images.unsplash.com/photo-1590424753062-ed0c09268886?q=80&w=2000&auto=format&fit=crop", title: "Toroslar'da Şafak", category: "Doğa" },
];

export default function Gallery({ onSelectBackground }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-1 bg-red-600 mb-6"
        />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Anadolu Galerisi</h2>
        <p className="text-white/40 max-w-xl font-light">
          Yer sorunu yaşamamanız için görselleri yüksek performanslı bulut sunuculardan çekiyoruz. 
          Siz de kendi görsellerinizin linklerini ekleyerek galeriyi büyütebilirsiniz.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
              index === 0 ? "md:col-span-2 md:row-span-2" : 
              index === 3 ? "md:col-span-1 md:row-span-2" : ""
            }`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-2">{photo.category}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <ZoomIn className="w-4 h-4" />
                <span>Büyütmek için tıkla</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>

            <motion.div
              layoutId={selectedPhoto.id.toString()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
              <div className="mt-8 text-center pointer-events-auto flex flex-col items-center gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">{selectedPhoto.title}</h3>
                  <p className="text-red-500 font-mono tracking-widest uppercase text-sm">{selectedPhoto.category}</p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBackground(selectedPhoto.url);
                    setSelectedPhoto(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-xl flex items-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  Ana Sayfa Arka Planı Yap
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
