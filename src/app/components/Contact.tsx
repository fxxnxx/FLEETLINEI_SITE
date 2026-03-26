import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { useState } from "react";
import { GlassButton } from "./GlassButton";
import discordIcon from "@/assets/discord-black-icon.svg";

export function Contact() {
  const emailAddress = "balbasov.design@gmail.com";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/balbasov.design@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Новая заявка с сайта: ${formData.subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Contact form submit failed:", error);
      setSubmitError("Не удалось отправить заявку. Попробуйте еще раз чуть позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: emailAddress,
      href: gmailComposeUrl,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Телефон",
      value: "+7 (986) 008-69-69",
      href: "tel:+79860086969",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Локация",
      value: "Ростов-на-Дону, Россия",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Send className="w-5 h-5 telegram-icon" />,
      label: "Telegram",
      href: "https://t.me/ilyafleet",
    },
    {
      icon: <img src={discordIcon} alt="" className="w-5 h-5 discord-icon" aria-hidden="true" />,
      label: "Discord",
      href: "https://discordapp.com/users/353830271298043905",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://www.instagram.com/fleetlinei/",
    },
  ];

  return (
    <div className="pt-20">
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl mb-6">Контакты</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Свяжитесь со мной, чтобы обсудить ваш проект.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-4">Давайте создадим что-то вместе</h2>
                <p className="text-muted-foreground">
                  Я всегда открыт к новым проектам и интересным предложениям. Если хотите обсудить
                  сотрудничество, заполните форму или напишите напрямую.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    {info.href ? (
                      <a
                        href={info.href}
                        className="group flex items-start gap-4 rounded-xl p-1 -m-1 transition-colors hover:text-primary"
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-xl text-[#D0CBAE] flex-shrink-0 transition-colors group-hover:text-[#EDECE7]"
                          style={{
                            background: "rgba(194, 181, 112, 0.15)",
                            border: "1px solid rgba(194, 181, 112, 0.25)",
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 group-hover:text-primary/80">
                            {info.label}
                          </div>
                          <div className="transition-colors group-hover:text-primary">{info.value}</div>
                        </div>
                      </a>
                    ) : (
                      <>
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-xl text-[#D0CBAE] flex-shrink-0"
                          style={{
                            background: "rgba(194, 181, 112, 0.15)",
                            border: "1px solid rgba(194, 181, 112, 0.25)",
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                          <div>{info.value}</div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl mb-4">Социальные сети</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group flex items-center justify-center w-12 h-12 rounded-xl text-[#D0CBAE] hover:text-[#EDECE7] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(194, 181, 112, 0.15)",
                        border: "1px solid rgba(194, 181, 112, 0.25)",
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              <style>{`
                .telegram-icon {
                  transform: translateX(1px);
                }
                .discord-icon {
                  filter: brightness(0) saturate(100%) invert(87%) sepia(9%) saturate(654%) hue-rotate(12deg) brightness(95%) contrast(89%);
                  transition: filter 0.2s ease;
                }
                .group:hover .discord-icon {
                  filter: brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(169%) hue-rotate(16deg) brightness(102%) contrast(90%);
                }
              `}</style>

              <div className="p-4 bg-accent/50 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Доступен для новых проектов</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    style={{
                      background: "rgba(194, 181, 112, 0.15)",
                      border: "1px solid rgba(194, 181, 112, 0.25)",
                    }}
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    style={{
                      background: "rgba(194, 181, 112, 0.15)",
                      border: "1px solid rgba(194, 181, 112, 0.25)",
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2">
                    Тема
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    style={{
                      background: "rgba(194, 181, 112, 0.15)",
                      border: "1px solid rgba(194, 181, 112, 0.25)",
                    }}
                    placeholder="Тема сообщения"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    style={{
                      background: "rgba(194, 181, 112, 0.15)",
                      border: "1px solid rgba(194, 181, 112, 0.25)",
                    }}
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>

                <GlassButton
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  variant="accent"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Отправка..."
                  ) : isSubmitted ? (
                    "Сообщение отправлено!"
                  ) : (
                    <>
                      Отправить сообщение
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </GlassButton>

                {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
