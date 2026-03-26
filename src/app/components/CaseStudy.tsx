import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { getProjectBySlug, projects } from "../data/projects";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ViewerSource = "project" | "identity";

export function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeViewerSource, setActiveViewerSource] = useState<ViewerSource>("project");
  const [identityIndex, setIdentityIndex] = useState(0);
  const [identityAspectRatio, setIdentityAspectRatio] = useState(4 / 3);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragOrigin, setDragOrigin] = useState<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const [touchOrigin, setTouchOrigin] = useState<{
    id: number;
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);

  if (!project) {
    return (
      <div className="pt-20">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Card className="mx-auto max-w-2xl border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Кейс не найден</CardTitle>
                <CardDescription>
                  Похоже, для этого проекта еще не собрана отдельная страница.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline">
                  <Link to="/portfolio" className="inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Вернуться в портфолио
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  const galleryPreview = project.galleryPreview ?? project.gallery;
  const identityGallery = project.identityGallery ?? [];
  const identityGalleryPreview = project.identityGalleryPreview ?? identityGallery;
  const showIdentityBlock = identityGalleryPreview.length > 0;

  const activeFullscreenImages =
    activeViewerSource === "identity" && identityGallery.length > 0
      ? identityGallery
      : project.gallery;

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragOrigin(null);
    setTouchOrigin(null);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.4, 4));
  const zoomOut = () =>
    setZoom((prev) => {
      const next = Math.max(prev - 0.4, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });

  const openGallery = (index: number) => {
    setActiveViewerSource("project");
    resetZoom();
    setActiveImageIndex(index);
  };

  const openIdentityGallery = (index: number) => {
    if (!identityGallery.length) return;
    setActiveViewerSource("identity");
    resetZoom();
    setActiveImageIndex(index);
  };

  const closeGallery = () => {
    resetZoom();
    setActiveImageIndex(null);
  };

  const showPrev = () => {
    const total = activeFullscreenImages.length;
    if (!total) return;
    setActiveImageIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? total - 1 : prev - 1;
    });
  };

  const showNext = () => {
    const total = activeFullscreenImages.length;
    if (!total) return;
    setActiveImageIndex((prev) => {
      if (prev === null) return 0;
      return prev === total - 1 ? 0 : prev + 1;
    });
  };

  const showPrevIdentity = () => {
    if (!identityGalleryPreview.length) return;
    setIdentityIndex((prev) =>
      prev === 0 ? identityGalleryPreview.length - 1 : prev - 1,
    );
  };

  const showNextIdentity = () => {
    if (!identityGalleryPreview.length) return;
    setIdentityIndex((prev) =>
      prev === identityGalleryPreview.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    setIdentityIndex(0);
  }, [project.slug]);

  useEffect(() => {
    if (!showIdentityBlock) {
      setIdentityAspectRatio(4 / 3);
      return;
    }

    const currentSrc = identityGalleryPreview[identityIndex];
    if (!currentSrc) {
      setIdentityAspectRatio(4 / 3);
      return;
    }

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      const rawRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 4 / 3;
      const clampedRatio = Math.min(1.8, Math.max(1.1, rawRatio));
      setIdentityAspectRatio(clampedRatio);
    };

    img.onerror = () => {
      if (cancelled) return;
      setIdentityAspectRatio(4 / 3);
    };

    img.src = currentSrc;

    return () => {
      cancelled = true;
    };
  }, [showIdentityBlock, identityGalleryPreview, identityIndex, project.slug]);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") zoomOut();
      if (event.key === "0") resetZoom();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImageIndex, activeViewerSource]);

  useEffect(() => {
    if (activeImageIndex !== null) resetZoom();
  }, [activeImageIndex, activeViewerSource]);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImageIndex]);

  useEffect(() => {
    if (!dragOrigin || zoom <= 1) return;

    const onMouseMove = (event: MouseEvent) => {
      setPan({
        x: dragOrigin.panX + (event.clientX - dragOrigin.x),
        y: dragOrigin.panY + (event.clientY - dragOrigin.y),
      });
    };

    const onMouseUp = () => {
      setDragOrigin(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragOrigin, zoom]);

  return (
    <div className="pt-20">
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Button asChild variant="ghost" className="mb-8 px-0 hover:bg-transparent">
              <Link to="/portfolio" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад к портфолио
              </Link>
            </Button>

            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/20 bg-primary/10 px-3 py-1 text-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-6 max-w-4xl text-4xl md:text-6xl">{project.title}</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="max-h-[640px] h-full w-full object-cover"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1"
            >
              <Card className="border-border bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>О проекте</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">Клиент</div>
                    <div>
                      {project.clientUrl ? (
                        <>
                          <a
                            href={project.clientUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline decoration-current underline-offset-4 transition-colors hover:text-primary"
                          >
                            {project.client}
                          </a>
                          {project.clientNote ? <span>{` (${project.clientNote})`}</span> : null}
                        </>
                      ) : (
                        <>
                          {project.client}
                          {project.clientNote ? <span>{` (${project.clientNote})`}</span> : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">Год</div>
                    <div>{project.year}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">Срок</div>
                    <div>{project.duration}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">Роль</div>
                    <div>{project.role}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/60 backdrop-blur-sm lg:h-full">
                <CardHeader>
                  <CardTitle>Ключевые параметры</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border bg-background/30 px-4 py-3"
                    >
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {metric.label}
                      </div>
                      <div className="mt-2 text-lg">{metric.value}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Задача</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.challenge}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Решение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.solution}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Результат</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.result}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Что было сделано</CardTitle>
                <CardDescription>Основные материалы и deliverables по кейсу.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border bg-background/30 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="md:hidden -mx-6 overflow-x-auto pb-3">
              <div className="flex snap-x snap-mandatory gap-4 pl-6 pr-6">
                {galleryPreview.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => openGallery(index)}
                    className="group w-[92%] shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card/50 text-left"
                    aria-label={`Открыть изображение ${index + 1}`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      className="block h-auto w-full transition-transform duration-500 group-active:scale-[1.01]"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden gap-5 md:grid md:grid-cols-2">
              {galleryPreview.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index }}
                  className={index === 0 ? "md:col-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => openGallery(index)}
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card/50 text-left"
                    aria-label={`Открыть изображение ${index + 1}`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {showIdentityBlock && (
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-6">
            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Айдентика</CardTitle>
                <CardDescription>
                  Логотип и сопутствующие элементы фирменного стиля для этого проекта.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mx-auto w-full max-w-2xl">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-border bg-card/40"
                    layout
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ aspectRatio: identityAspectRatio }}
                  >
                  <button
                    type="button"
                    onClick={() => openIdentityGallery(identityIndex)}
                    className="group block w-full cursor-zoom-in"
                    aria-label="Открыть айдентику на весь экран"
                  >
                    <ImageWithFallback
                      src={identityGalleryPreview[identityIndex]}
                      alt={`Айдентика ${identityIndex + 1}`}
                      className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </button>

                  {identityGalleryPreview.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevIdentity}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        aria-label="Предыдущее изображение айдентики"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextIdentity}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        aria-label="Следующее изображение айдентики"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  </motion.div>
                </div>

                {identityGalleryPreview.length > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {identityGalleryPreview.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setIdentityIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === identityIndex ? "w-8 bg-primary" : "w-3 bg-foreground/25"
                        }`}
                        aria-label={`Показать слайд айдентики ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
      {relatedProjects.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl">Похожие кейсы</h2>
              <p className="text-muted-foreground">
                Еще несколько проектов в близкой категории и визуальном направлении.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedProjects.map((item) => (
                <Card
                  key={item.slug}
                  className="group cursor-pointer overflow-hidden border-border bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/portfolio/${item.slug}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/portfolio/${item.slug}`);
                    }
                  }}
                >
                  <div className="relative isolate aspect-[16/10] overflow-hidden border-b border-border">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="block h-full w-full scale-[1.01] object-cover transform-gpu will-change-transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild variant="outline">
                      <Link to={`/portfolio/${item.slug}`} className="inline-flex items-center gap-2">
                        Открыть кейс
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm"
          onClick={closeGallery}
          role="dialog"
          aria-modal="true"
          aria-label="Галерея проекта"
        >
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Закрыть галерею"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/55 px-2 py-1.5 text-white">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                zoomOut();
              }}
              className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              aria-label="Уменьшить"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                resetZoom();
              }}
              className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              aria-label="Сбросить масштаб"
              title="Сбросить масштаб"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                zoomIn();
              }}
              className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              aria-label="Увеличить"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <span className="min-w-14 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Следующее изображение"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
            <img
              src={activeFullscreenImages[activeImageIndex]}
              alt={`${project.title} fullscreen ${activeImageIndex + 1}`}
              className={`max-h-full max-w-full rounded-xl object-contain ${
                zoom > 1 ? (dragOrigin ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
              }`}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transition: dragOrigin ? "none" : "transform 180ms ease-out",
                touchAction: zoom > 1 ? "none" : "manipulation",
              }}
              draggable={false}
              onClick={(event) => {
                event.stopPropagation();
                if (zoom === 1) zoomIn();
              }}
              onMouseDown={(event) => {
                event.stopPropagation();
                if (event.button !== 0) return;
                if (zoom <= 1) return;
                event.preventDefault();
                setDragOrigin({
                  x: event.clientX,
                  y: event.clientY,
                  panX: pan.x,
                  panY: pan.y,
                });
              }}
              onWheel={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (event.deltaY < 0) {
                  setZoom((prev) => Math.min(prev + 0.2, 4));
                  return;
                }
                setZoom((prev) => {
                  const next = Math.max(prev - 0.2, 1);
                  if (next === 1) setPan({ x: 0, y: 0 });
                  return next;
                });
              }}
              onTouchStart={(event) => {
                event.stopPropagation();
                if (zoom <= 1) return;
                const touch = event.touches[0];
                if (!touch) return;
                setTouchOrigin({
                  id: touch.identifier,
                  x: touch.clientX,
                  y: touch.clientY,
                  panX: pan.x,
                  panY: pan.y,
                });
              }}
              onTouchMove={(event) => {
                if (!touchOrigin || zoom <= 1) return;
                const touch = Array.from(event.touches).find((item) => item.identifier === touchOrigin.id);
                if (!touch) return;
                event.preventDefault();
                event.stopPropagation();
                setPan({
                  x: touchOrigin.panX + (touch.clientX - touchOrigin.x),
                  y: touchOrigin.panY + (touch.clientY - touchOrigin.y),
                });
              }}
              onTouchEnd={() => setTouchOrigin(null)}
              onTouchCancel={() => setTouchOrigin(null)}
            />
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-1.5 text-sm text-white">
            {activeImageIndex + 1} / {activeFullscreenImages.length}
          </div>
        </div>
      )}
    </div>
  );
}






















