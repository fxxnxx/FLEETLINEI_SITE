import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { GlassButton } from "./GlassButton";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-8xl mb-6"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl mb-4">Страница не найдена</h1>
        <p className="text-muted-foreground mb-8">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <GlassButton variant="primary" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              На главную
            </GlassButton>
          </Link>
          
          <GlassButton 
            variant="outline" 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </GlassButton>
        </div>
      </motion.div>
    </div>
  );
}