import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Portfolio } from "./components/Portfolio";
import { CaseStudy } from "./components/CaseStudy";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:slug", Component: CaseStudy },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
