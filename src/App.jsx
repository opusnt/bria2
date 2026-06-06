import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Map, 
  FileText, 
  Trees, 
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle,
  MapPin,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Target
} from 'lucide-react';
import './index.css';

const logoSrc = '/media__1780537417766.png'; // uploaded logo

// Slide variants for framer-motion
const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
    };
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function useWindowScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleX = width / 1920;
      const scaleY = height / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return scale;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const scale = useWindowScale();

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current]);

  const CurrentSlideComponent = slides[current];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', overflow: 'hidden' }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center center', position: 'relative' }}>
        <div className="slide-container">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>

          <div className="controls">
            <button onClick={prevSlide} disabled={current === 0}>
              <ChevronLeft />
            </button>
            <button onClick={nextSlide} disabled={current === slides.length - 1}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SLIDES ---

const SlideLogo = () => (
  <div className="logo-corner">
    <img src={logoSrc} alt="Bría Logo" style={{filter: "brightness(0) invert(1)"}} />
  </div>
);

const Slide1 = () => (
  <div className="slide-container">
    <div className="slide-bg" style={{ backgroundImage: 'url(/cover_bg_1780537537769.png)' }}></div>
    <div className="overlay"></div>
    <SlideLogo />
    
    <div className="content-z" style={{ justifyContent: 'center' }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <motion.h1 variants={itemVariant} style={{ fontSize: '4.5rem', maxWidth: '1000px' }}>
          ¿Cómo podemos entregar un <span className="highlight">30% más</span> de viviendas sociales DS49 con el <span className="highlight">mismo</span> presupuesto anual?
        </motion.h1>
        
        <motion.h2 variants={itemVariant} style={{ color: 'var(--bria-yellow)', fontSize: '2rem', fontWeight: 500 }}>
          La respuesta está en los DS49 Rurales Masivos bajo la Metodología Bría
        </motion.h2>

        <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '3rem' }}>
          <div className="glass" style={{ padding: '3rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '8rem', fontWeight: 900, color: 'var(--bria-blue)' }}>30%</span>
          </div>
          <div className="glass" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <div>
              <div style={{ color: 'var(--light-gray)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Hoy:</div>
              <div style={{ fontSize: '2.5rem' }}>🏠🏠🏠🏠🏠</div>
            </div>
            <div>
              <div style={{ color: 'var(--bria-yellow)', marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Modelo Bría:</div>
              <div style={{ fontSize: '2.5rem' }}>🏠🏠🏠🏠🏠🏠🏠</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariant} style={{ marginTop: 'auto', paddingTop: '2rem', color: 'var(--light-gray)', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Vivienda social &nbsp;|&nbsp; Estrategia territorial &nbsp;|&nbsp; Desarrollo sustentable
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const Slide2 = () => (
  <div className="slide-container">
    <div className="slide-bg" style={{ backgroundImage: 'url(/abstract_bg_1780537548589.png)' }}></div>
    <div className="overlay"></div>
    <SlideLogo />
    
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        El modelo anterior funcionaba porque el contexto era distinto
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem' }}>
        
        <motion.div variants={itemVariant} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--bria-blue)', fontSize: '2rem', fontWeight: 800 }}>
          <span>2000</span>
          <div style={{ height: '4px', background: 'var(--bria-blue)', flex: 1, margin: '0 2rem' }}></div>
          <span>2026</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            { icon: <TrendingUp size={48}/>, text: "Mayor disponibilidad de subsidios" },
            { icon: <Map size={48}/>, text: "Mayor disponibilidad de terrenos" },
            { icon: <FileText size={48}/>, text: "Menor presión normativa" },
            { icon: <Home size={48}/>, text: "Proyectos rurales de baja escala" }
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariant} className="glass" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: 'var(--bria-yellow)' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{item.text}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariant} className="glass-light" style={{ padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ margin: 0, color: 'var(--dark-blue)', fontSize: '1.8rem' }}>
            El sistema funcionaba porque existía un equilibrio entre disponibilidad de suelo, subsidios y capacidad de desarrollo
          </h3>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const Slide3 = () => (
  <div className="slide-container" style={{ background: 'var(--dark-blue)' }}>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        El escenario cambió radicalmente
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariant} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--bria-blue)' }}>
              Oferta de terrenos factibles
            </motion.div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {[
                "Aumento valor suelo urbano", "Humedales", "Restricciones arqueológicas",
                "Cambios normativos", "DGA y DOH", "Planes reguladores",
                "Aumento costos de construcción", "Ingreso al SEIA"
              ].map((factor, i) => (
                <motion.div key={i} variants={itemVariant} className="glass" style={{ padding: '1rem 1.5rem', borderLeft: '4px solid var(--bria-yellow)' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{factor}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariant} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--bria-blue)', marginTop: '1rem' }}>
              Cada vez más escasa
            </motion.div>
          </div>

          <motion.div variants={itemVariant}>
            <img src="/urban.png" alt="Urban restrictions" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariant} style={{ background: 'var(--bria-yellow)', color: 'var(--dark-blue)', padding: '1.5rem 4rem', borderRadius: '100px', fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 20px 40px rgba(245,188,54,0.3)', marginTop: '1rem' }}>
          <AlertTriangle size={36} />
          Menos terrenos factibles = menos viviendas posibles
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide4 = () => (
  <div className="slide-container">
    <div className="slide-bg" style={{ backgroundImage: 'url(/abstract_bg_1780537548589.png)' }}></div>
    <div className="overlay"></div>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        La experiencia reciente demuestra las limitaciones
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', width: '100%', maxWidth: '1200px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariant} className="glass" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--bria-yellow)', fontSize: '2rem', marginBottom: '1.5rem' }}>DS10 Rural</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {["Escala pequeña", "Poco atractivo económicamente", "Alta incertidumbre sanitaria"].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
                    <span style={{ color: 'var(--bria-blue)' }}>▹</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariant} className="glass" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--bria-yellow)', fontSize: '2rem', marginBottom: '1.5rem' }}>DS49 Rural tradicional</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {["Menos de 160 viviendas", "Evita ingreso al SEIA", "Escaso impacto habitacional"].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
                    <span style={{ color: 'var(--bria-blue)' }}>▹</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariant}>
            <img src="/housing.png" alt="Housing project" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariant} style={{ background: 'var(--bria-yellow)', color: 'var(--dark-blue)', padding: '1.5rem 2rem', borderRadius: '16px', textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
            La imposibilidad de desarrollar proyectos de gran escala ha reducido el número de viviendas construidas
          </h3>
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide5 = () => (
  <div className="slide-container" style={{ background: 'var(--dark-blue)' }}>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        La solución: DS49 Rurales Masivos bajo Metodología Bría
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', width: '100%' }}>
          {[
            { step: "Etapa 1", title: "Prefactibilidad integral", icon: <MapPin size={40}/> },
            { step: "Etapa 2", title: "Estrategia de desarrollo por etapas", icon: <Settings size={40}/> },
            { step: "Etapa 3", title: "Permisos ambientales y sectoriales en paralelo", icon: <ShieldCheck size={40}/> }
          ].map((s, i) => (
            <React.Fragment key={i}>
              <motion.div variants={itemVariant} className="glass" style={{ flex: 1, padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', background: 'rgba(63, 105, 175, 0.2)', border: '1px solid var(--bria-blue)' }}>
                <div style={{ color: 'var(--bria-yellow)' }}>{s.icon}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--bria-yellow)', textTransform: 'uppercase' }}>{s.step}</div>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{s.title}</h3>
              </motion.div>
              {i < 2 && <motion.div variants={itemVariant} style={{ color: 'var(--bria-blue)' }}>
                <ChevronRight size={64} />
              </motion.div>}
            </React.Fragment>
          ))}
        </div>

        <motion.div variants={itemVariant} style={{ fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span>Terreno</span>
          <span style={{ color: 'var(--bria-blue)' }}>➔</span>
          <span>Estrategia</span>
          <span style={{ color: 'var(--bria-blue)' }}>➔</span>
          <span style={{ color: 'var(--bria-yellow)' }}>RCA</span>
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide6 = () => (
  <div className="slide-container">
    <div className="slide-bg" style={{ backgroundImage: 'url(/cover_bg_1780537537769.png)', filter: 'blur(5px)' }}></div>
    <div className="overlay"></div>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        Las reglas para que el modelo funcione
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          {[
            { num: "Regla 1", text: "Terreno rural colindante al límite urbano" },
            { num: "Regla 2", text: "Primera etapa ≤ 500 viviendas" },
            { num: "Regla 3", text: "Suelo SAG categoría IV o superior" }
          ].map((r, i) => (
            <motion.div key={i} variants={itemVariant} className="glass-light" style={{ padding: '3rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
              <div style={{ position: 'absolute', top: '-25px', background: 'var(--bria-blue)', color: 'white', padding: '10px 30px', borderRadius: '30px', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(63, 105, 175, 0.4)' }}>
                {r.num}
              </div>
              <h3 style={{ fontSize: '1.6rem', marginTop: '1rem', color: 'var(--dark-blue)' }}>{r.text}</h3>
              <div style={{ marginTop: 'auto', background: '#00B050', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 30px rgba(0, 176, 80, 0.5)' }}>
                <Check size={32} strokeWidth={4} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariant} style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.8rem', fontWeight: 600 }}>
          No cualquier terreno sirve. <span style={{ color: 'var(--bria-yellow)' }}>La selección correcta determina el éxito del proyecto.</span>
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide7 = () => (
  <div className="slide-container" style={{ background: 'var(--dark-blue)' }}>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        10 factores críticos que aseguran la viabilidad
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {[
              "1. Desarrollo por etapas", "6. IMIV",
              "2. Núcleo urbano", "7. Accesos",
              "3. Cercanía urbana", "8. IFC",
              "4. Solución sanitaria", "9. Participación ciudadana",
              "5. Suelo SAG", "10. Tramitación paralela"
            ].map((factor, i) => (
              <motion.div key={i} variants={itemVariant} className="glass" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderLeft: '4px solid var(--bria-blue)' }}>
                <Target size={20} color="var(--bria-yellow)" />
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{factor}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariant}>
            <img src="/strategy.png" alt="Strategy" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariant} style={{ background: 'var(--bria-yellow)', color: 'var(--dark-blue)', padding: '1.5rem 2rem', borderRadius: '16px', textAlign: 'center', width: '100%' }}>
          <h3 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 800 }}>
            La diferencia no es el terreno.<br/>La diferencia es la estrategia.
          </h3>
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide8 = () => (
  <div className="slide-container" style={{ background: 'var(--dark-blue)' }}>
    <div className="slide-bg" style={{ backgroundImage: 'url(/abstract_bg_1780537548589.png)', opacity: 0.3 }}></div>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        ¿Por qué este modelo genera un 30% más de viviendas?
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '2rem', flex: 1, alignItems: 'center' }}>
          
          <motion.div variants={itemVariant} style={{ background: 'var(--bria-blue)', borderRadius: '50%', width: '250px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 auto', boxShadow: '0 20px 40px rgba(63, 105, 175, 0.4)', textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Costo Urbano</h3>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>40% Terreno</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>60% Obra</div>
          </motion.div>

          <motion.div variants={itemVariant} className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Terreno urbano = <span style={{fontWeight: 800}}>100%</span></div>
            <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', margin: '1rem 0' }}></div>
            <div style={{ fontSize: '1.5rem', marginTop: '1.5rem', color: 'var(--bria-yellow)' }}>Terreno rural = <span style={{fontWeight: 800}}>20%-25%</span></div>
          </motion.div>

          <motion.div variants={itemVariant} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '8rem', fontWeight: 900, color: 'var(--bria-blue)', textShadow: '0 10px 30px rgba(63, 105, 175, 0.3)', lineHeight: 1 }}>
              +30%
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 600, marginTop: '1rem' }}>
              más viviendas con el mismo presupuesto
            </div>
          </motion.div>

        </div>

        <motion.div variants={itemVariant} className="glass-light" style={{ padding: '2rem 3rem' }}>
          <h3 style={{ color: 'var(--dark-blue)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Beneficios adicionales:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              "Subsidio de factibilización existente", "Mayor velocidad de desarrollo",
              "Casos reales aprobados", "Cumplimiento normativo total",
              "Menor costo de suelo", "Expansión controlada de suelo"
            ].map((ben, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--dark-blue)', fontWeight: 600 }}>
                <CheckCircle size={20} color="var(--bria-blue)" />
                {ben}
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  </div>
);

const Slide9 = () => (
  <div className="slide-container" style={{ background: 'var(--dark-blue)' }}>
    <SlideLogo />
    <div className="content-z">
      <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{color: 'white', marginTop: '2rem'}}>
        Oportunidades de mejora normativa
      </motion.h2>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariant} className="glass" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(63, 105, 175, 0.4) 0%, rgba(28, 41, 66, 0.8) 100%)', border: '1px solid var(--bria-blue)' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--bria-yellow)', marginBottom: '1.5rem' }}>Acuerdo SEA + SAG</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                Permitir DIA en determinados terrenos con clasificación SAG inferior a IV.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--bria-yellow)' }}>
                <div style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--light-gray)', marginBottom: '0.5rem', fontWeight: 600 }}>Beneficio Principal</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>Más suelo disponible para vivienda social</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(63, 105, 175, 0.4) 0%, rgba(28, 41, 66, 0.8) 100%)', border: '1px solid var(--bria-blue)' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--bria-yellow)', marginBottom: '1.5rem' }}>Extender DS19 a zonas rurales</h3>
              <div style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--light-gray)', marginBottom: '1rem', fontWeight: 600 }}>Beneficios:</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  "Menor costo de terreno",
                  "Más viviendas",
                  "Mayor acceso",
                  "Menores créditos hipotecarios"
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.2rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--bria-yellow)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariant}>
            <img src="/normative.png" alt="Normative opportunities" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
);

const Slide10 = () => (
  <div className="slide-container">
    <div className="slide-bg" style={{ backgroundImage: 'url(/conclusion_bg_1780537560502.png)' }}></div>
    <div className="overlay"></div>
    <SlideLogo />
    <div className="content-z" style={{ justifyContent: 'center' }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        <motion.h1 variants={itemVariant} style={{ fontSize: '4rem', color: 'var(--bria-yellow)', maxWidth: '1100px' }}>
          La crisis habitacional no se resolverá únicamente con más recursos.
        </motion.h1>
        
        <motion.div variants={itemVariant} className="glass" style={{ padding: '3rem', maxWidth: '1000px', borderLeft: '6px solid var(--bria-blue)' }}>
          <p style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '2rem' }}>
            Se resolverá utilizando de manera más eficiente los recursos disponibles.
          </p>
          <p style={{ fontSize: '1.4rem', color: 'var(--light-gray)' }}>
            Los DS49 Rurales Masivos permiten ampliar la oferta de vivienda social utilizando terrenos que hoy permanecen fuera de la planificación tradicional, manteniendo el cumplimiento ambiental y normativo.
          </p>
        </motion.div>

        <motion.div variants={itemVariant} style={{ marginTop: '2rem', display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bria-yellow)' }}>30% más viviendas</div>
          <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.3)' }}></div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Mismo presupuesto</div>
          <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.3)' }}></div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bria-blue)' }}>Metodología Bría</div>
        </motion.div>

      </motion.div>
    </div>
  </div>
);
