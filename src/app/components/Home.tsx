import { Link } from "react-router";
import { ArrowRight, Palette, Layout, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { ProjectCategory } from "../data/projects";
import { GlassButton } from "./GlassButton";
import { HeroBackground } from "./HeroBackground";

export function Home() {
  const services: Array<{
    icon: React.ReactNode;
    filter: ProjectCategory;
    title: string;
    description: string;
  }> = [
    {
      icon: <Layout className="w-8 h-8" />,
      filter: "ui",
      title: "UX/UI Дизайн",
      description:
        "Создание интуитивных и привлекательных интерфейсов для веб и мобильных приложений",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      filter: "web",
      title: "Веб Дизайн",
      description:
        "Дизайн современных и функциональных веб-сайтов с фокусом на пользовательский опыт",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      filter: "graphic",
      title: "Графический Дизайн",
      description:
        "Разработка визуального контента: логотипы, брендинг, иллюстрации",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-55">
          <HeroBackground />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full text-sm"
              style={{
                background: "rgba(208, 203, 174, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(208, 203, 174, 0.2)",
                color: "#d0cbae",
              }}
            >
              UX/UI & Графический Дизайнер
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl mb-6 tracking-tight"
            >
              Создаю дизайн,
              <br />
              который <span className="text-primary">вдохновляет</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              Специализируюсь на создании современных цифровых продуктов с фокусом на удобство
              использования и визуальную привлекательность
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/portfolio">
                <GlassButton variant="primary" className="group inline-flex items-center gap-2">
                  Посмотреть работы
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
              </Link>
              <Link to="/contact">
                <GlassButton variant="outline">Связаться со мной</GlassButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Что я делаю</h2>
            <p className="text-muted-foreground max-w-2xl">
              Предоставляю комплексные услуги в области дизайна для разработки эффективных и
              успешных цифровых продуктов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={service.title} to={`/portfolio?filter=${service.filter}`} className="group block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full p-8 border border-border rounded-xl transition-colors group-hover:border-primary/50"
                >
                  <div className="mb-4 text-primary">{service.icon}</div>
                  <h3 className="text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">Готовы начать новый проект?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь со мной, чтобы обсудить ваш проект и узнать, как я могу помочь воплотить
              ваши идеи в жизнь
            </p>
            <Link to="/contact">
              <GlassButton variant="accent" className="inline-flex items-center gap-2">
                Начать проект
                <ArrowRight className="w-5 h-5" />
              </GlassButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
