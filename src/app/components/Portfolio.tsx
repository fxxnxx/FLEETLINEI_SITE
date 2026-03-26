import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { projectFilters, projects } from "../data/projects";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Portfolio() {
  const location = useLocation();
  const navigate = useNavigate();

  const getFilterFromSearch = () => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    return projectFilters.some((item) => item.id === filter) ? filter : "all";
  };

  const [activeFilter, setActiveFilter] = useState(getFilterFromSearch);

  useEffect(() => {
    setActiveFilter(getFilterFromSearch());
  }, [location.search]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);

    const params = new URLSearchParams(location.search);
    if (filterId === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filterId);
    }

    const search = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : "",
      },
      { replace: true },
    );
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="pt-20">
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl mb-6">Портфолио</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Коллекция избранных проектов, которые теперь ведут на полноценные страницы кейсов.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 border-b border-border sticky top-[73px] bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                  activeFilter === filter.id ? "text-accent" : "text-foreground/80"
                }`}
                style={
                  activeFilter === filter.id
                    ? {
                        background: "rgba(194, 181, 112, 0.2)",
                        border: "1px solid rgba(194, 181, 112, 0.3)",
                        boxShadow:
                          "0 8px 32px 0 rgba(194, 181, 112, 0.3), inset 0 1px 0 0 rgba(194, 181, 112, 0.4)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                      }
                    : {
                        background: "rgba(7, 7, 5, 0.4)",
                        border: "1px solid rgba(208, 203, 174, 0.2)",
                        boxShadow:
                          "0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(208, 203, 174, 0.1)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                      }
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${activeFilter}-${project.slug}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                className="h-full"
              >
                <Link to={`/portfolio/${project.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-border bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                    <div className="relative isolate aspect-[4/3] overflow-hidden bg-accent">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="block h-full w-full scale-[1.01] object-cover transform-gpu will-change-transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/92 via-background/28 to-transparent p-6 opacity-0 will-change-opacity pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-primary">
                          <span>Открыть кейс</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <CardHeader className="gap-4">
                      <div className="flex flex-wrap gap-2">
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
                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {project.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">Проекты не найдены</div>
          )}
        </div>
      </section>
    </div>
  );
}
