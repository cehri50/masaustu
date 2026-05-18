/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Download, Flag, Heart, MapPin, Wind } from "lucide-react";
import { useState, useEffect } from "react";
import Gallery from "./components/Gallery";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [bgUrl, setBgUrl] = useState("https://images.unsplash.com/photo-1627393433364-15f10660a92f?q=80&w=2600&auto=format&fit=crop");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgUrl(url);
    }
  };

  const wallpaperData = {
    title: "Vatan ve Kapadokya",
    description: "Atatürk'ün izinde, Üç Güzeller'in masalsı manzarasında şanlı bayrağımız dalgalanıyor.",
    location: "Üç Güzeller, Kapadokya",
    credits: "Özel Tasarım Duvar Kağıdı",
    ataturkUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ataturk_silhouette.svg/1024px-Ataturk_silhouette.svg.png",
  };

  const handleDownload = async () => {
    try {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = bgUrl;
      link.download = "ay-yildiz-duvar-kagidi.jpg"; // Default filename
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("İndirme hatası:", error);
      // Fallback to window.open if link approach fails
      window.open(bgUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <AnimatePresence>
        {showUI && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center glass"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Flag className="text-white w-4 h-4" />
              </div>
              <span className="font-serif italic font-bold tracking-tight text-xl">Ay Yıldız</span>
            </div>
            
            <div className="flex gap-4 items-center text-white/80">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Görseli Değiştir
              </button>
              <div className="h-4 w-[1px] bg-white/20 mx-2" />
              <Heart className="w-5 h-5 text-red-500 cursor-pointer hover:fill-red-500 transition-all" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && showUI && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-24 right-6 z-50 w-80 glass p-6 rounded-2xl shadow-2xl border border-white/20"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Wind className="w-4 h-4 text-red-500" />
              Görsel Ayarları
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2">Bilgisayardan Yükle</label>
                <label className="flex items-center justify-center w-full px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <span className="text-xs">Dosya Seç</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2">İnternetten Link Yapıştır (URL)</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-red-500 transition-all"
                  onChange={(e) => setBgUrl(e.target.value)}
                />
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all"
              >
                Tamam
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero / Wallpaper Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <motion.div 
          key={bgUrl}
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src={bgUrl} 
            alt="Background" 
            className="w-full h-full object-cover opacity-70 grayscale-[0.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </motion.div>

        {/* Turkish Flag Overlay (Subtle) */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center opacity-20 pointer-events-none"
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="666.6" viewBox="0 0 1200 800" className="w-[80%] h-auto">
            <rect width="1200" height="800" fill="#e30a17" opacity="0.3" />
            <circle cx="425" cy="400" r="200" fill="#fff"/>
            <circle cx="475" cy="400" r="160" fill="#e30a17"/>
            <path d="M583.3,400 706.7,440 660,335 660,465 706.7,360" fill="#fff"/>
          </svg>
        </motion.div>

        {/* Atatürk Silhouette Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 z-20 w-full h-[90%] flex items-end justify-start px-12 pb-0 pointer-events-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <img 
            src={wallpaperData.ataturkUrl} 
            alt="Atatürk Silhouette" 
            className="h-[95%] w-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] invert"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <AnimatePresence>
          {showUI && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-30 text-center max-w-4xl px-6"
            >
              <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-2xl">
                Göklerden Gelen <span className="text-red-500">Eşsiz</span> Miras
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 font-light italic">
                "{wallpaperData.description}"
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Arka Planı İndir
                </motion.button>
                
                <button 
                  onClick={() => setShowUI(false)}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                >
                  <Wind className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm uppercase tracking-widest font-mono">Ekranı Temizle</span>
                </button>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 p-4 glass rounded-xl max-w-md mx-auto text-sm text-white/40 italic"
              >
                <p>💡 <strong>İpucu:</strong> "Ekranı Temizle" butonuna basarak tasarımı tam ekran yapabilir, ardından ekran görüntüsü alarak masaüstü duvar kağıdı olarak kullanabilirsiniz.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restore UI Button */}
        {!showUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-10 right-10 z-50 flex flex-col items-end gap-2"
          >
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono select-none">Arayüzü Göster</p>
            <button
              onClick={() => setShowUI(true)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-full text-white transition-all"
            >
              <Wind className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {/* Floating Labels */}
        <AnimatePresence>
          {showUI && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-3 pointer-events-none"
            >
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                <MapPin className="text-red-500 w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-tighter text-white/60">{wallpaperData.location}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 -skew-y-3 transform origin-right" />
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-5xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-red-500 font-mono tracking-widest uppercase text-xs">Ebedi Liderimiz</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                "Ey yükselen yeni nesil! <br/> İstikbal sizindir."
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Cumhuriyeti biz kurduk, onu yükseltecek ve yaşatacak olan sizlersiniz. Vatanın her karış toprağına, tarihinden aldığımız güçle sahip çıkıyoruz.
              </p>
              <div className="w-12 h-1 bg-red-600" />
            </div>
            
            <div className="glass p-12 rounded-[32px] border-white/5 relative group">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-serif">"</div>
              <p className="text-xl md:text-2xl italic text-white/90 mb-8 leading-relaxed font-serif">
                "Vatanını en çok seven, görevini en iyi yapandır."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
                   <img src={wallpaperData.ataturkUrl} alt="Atatürk" className="w-full h-full object-cover grayscale invert" />
                </div>
                <div>
                  <p className="text-sm font-bold">Mustafa Kemal ATATÜRK</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Türkiye Cumhuriyeti Kurucusu</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modern Gallery Section */}
      <Gallery onSelectBackground={setBgUrl} />

      {/* Grid Features */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Çözünürlük", value: "4K High Res", icon: <Wind className="w-5 h-5 text-red-500" /> },
            { title: "Lokalizasyon", value: "Üç Güzeller", icon: <MapPin className="w-5 h-5 text-red-500" /> },
            { title: "Tema", value: "Vatan & Destan", icon: <Flag className="w-5 h-5 text-red-500" /> },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-white/5 transition-all cursor-default"
            >
              <div className="mb-4 p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-2">{item.title}</h3>
              <p className="text-xl font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/5 text-center">
        <p className="text-sm text-white/20 font-mono tracking-widest">
           &copy; 2024 AY YILDIZ WALLPAPER PROJECTS
        </p>
      </footer>
    </div>
  );
}
