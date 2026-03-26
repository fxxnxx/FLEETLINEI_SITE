import { motion } from "motion/react";
import { Palette, Zap, Users, Award } from "lucide-react";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import designImage from "@/assets/DESIGN.png";

export function About() {
  const skills = [
    { name: "Figma", level: 95 },
    { name: "Prototyping", level: 90 },
    { name: "Photoshop", level: 75 },
    { name: "Illustrator", level: 50 },
    { name: "Tilda", level: 75 },
    { name: "Framer", level: 75 },
  ];

  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Инновации",
      description: "Постоянно изучаю новые тренды и технологии в дизайне",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Пользователь в центре",
      description: "Создаю дизайн, ориентированный на потребности пользователей",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Качество",
      description: "Внимание к деталям и стремление к совершенству",
    },
  ];

  const experience = [
    {
      year: "2023 - н.в.",
      role: "Графический / UX/UI дизайнер",
      company: "BEAUTYRANK",
      description:
        "1. Брендинг, айдентика, цифровая графика. 2. Проектирование интерфейса веб-приложения и разработка дизайн-системы. 3. Координация процессов разработки и тестирования функционала.",
    },
    {
      year: "2022 - н.в.",
      role: "Графический дизайнер",
      company: "PM BeautyDon",
      description: "Брендинг, айдентика, печатная и цифровая графика.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl mb-6">Обо мне</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Дизайнер с 3+ летним опытом создания цифровых продуктов
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <ImageWithFallback
                  src={designImage}
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl">Я UX/UI и продуктовый дизайнер</h2>
              <p className="text-muted-foreground">
                Проектирую интерфейсы и цифровые сервисы, которые помогают бизнесу достигать
                целей, а пользователям быстро и понятно решать свои задачи.
              </p>
              <p className="text-muted-foreground">
                В работе опираюсь на исследование, логику пользовательских сценариев и сильную
                визуальную систему. Для меня важно, чтобы дизайн был не только эстетичным,
                но и измеримо эффективным.
              </p>
              <p className="text-muted-foreground">
                Умею вести проект от идеи и структуры до прототипа и финальной реализации,
                сохраняя единый стиль, качество и фокус на результате.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-12 text-center"
          >
            Мои принципы
          </motion.h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-12"
          >
            Навыки и инструменты
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-accent rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-12"
          >
            Опыт работы
          </motion.h2>

          <div className="max-w-3xl space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary/30 pb-8 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="text-sm text-muted-foreground mb-2">{item.year}</div>
                <h3 className="text-xl mb-1">{item.role}</h3>
                <div className="text-primary mb-2">{item.company}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}





