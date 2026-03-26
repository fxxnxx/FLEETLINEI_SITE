import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "@/assets/logo.svg";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Главная" },
    { path: "/portfolio", label: "Портфолио" },
    { path: "/about", label: "Обо мне" },
    { path: "/contact", label: "Контакты" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-xl border-b border-primary/20" 
           style={{ 
             boxShadow: '0 8px 32px 0 rgba(208, 203, 174, 0.1), inset 0 1px 0 0 rgba(208, 203, 174, 0.2)'
           }} />
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="relative z-10 flex items-center justify-center rounded-lg px-4 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "rgba(194, 181, 112, 0.1)",
              border: "1px solid rgba(194, 181, 112, 0.22)",
              boxShadow:
                "0 4px 16px 0 rgba(194, 181, 112, 0.2), inset 0 1px 0 0 rgba(194, 181, 112, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(194, 181, 112, 0.16)";
              e.currentTarget.style.border = "1px solid rgba(194, 181, 112, 0.34)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px 0 rgba(194, 181, 112, 0.26), inset 0 1px 0 0 rgba(194, 181, 112, 0.38)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(194, 181, 112, 0.1)";
              e.currentTarget.style.border = "1px solid rgba(194, 181, 112, 0.22)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px 0 rgba(194, 181, 112, 0.2), inset 0 1px 0 0 rgba(194, 181, 112, 0.3)";
            }}
          >
            <img 
              src={logoImg} 
              alt="Logo" 
              className="block h-7 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(74%) sepia(28%) saturate(439%) hue-rotate(13deg) brightness(88%) contrast(84%)' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isActive(link.path) 
                    ? "text-accent" 
                    : "text-foreground/80 hover:text-primary"
                }`}
                style={
                  isActive(link.path)
                    ? {
                        background: "rgba(194, 181, 112, 0.1)",
                        border: "1px solid rgba(194, 181, 112, 0.2)",
                        boxShadow:
                          "0 4px 16px 0 rgba(194, 181, 112, 0.2), inset 0 1px 0 0 rgba(194, 181, 112, 0.3)",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid transparent",
                        boxShadow: "none",
                      }
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg relative z-10"
            style={{
              background: 'rgba(208, 203, 174, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(208, 203, 174, 0.2)',
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0, marginTop: 0 }}
              animate={{ opacity: 1, maxHeight: 420, marginTop: 16 }}
              exit={{ opacity: 0, maxHeight: 0, marginTop: 0 }}
              transition={{
                maxHeight: { duration: 1.02, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                marginTop: { duration: 1.02, ease: [0.22, 1, 0.36, 1] },
              }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-3 p-4 rounded-xl"
                   style={{
                     background: 'rgba(7, 7, 5, 0.8)',
                     backdropFilter: 'blur(16px)',
                     border: '1px solid rgba(208, 203, 174, 0.15)',
                     boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                   }}>
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.path) ? "text-accent bg-accent/10" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}








