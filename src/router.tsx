import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";

/**
 * Auto-discovers pages from src/pages/.
 *
 * Convention:
 *   src/pages/index.tsx      → /
 *   src/pages/hello_world.tsx → /hello_world
 *   src/pages/about.tsx       → /about
 *
 * Each page file must `export default` a React component.
 */
const pageModules = import.meta.glob<{ default: React.ComponentType }>(
  "./pages/*.tsx",
);

const NotFound = lazy(() => import("./pages/not-found"));

function lazyPage(importFn: () => Promise<{ default: React.ComponentType }>) {
  const Component = lazy(importFn);
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

function buildRoutes() {
  const routes: { path: string; element: React.ReactNode }[] = [];

  for (const [filePath, importFn] of Object.entries(pageModules)) {
    const fileName = filePath
      .replace("./pages/", "")
      .replace(".tsx", "");

    if (fileName === "not-found") continue;

    const routePath = fileName === "index" ? "/" : `/${fileName}`;
    routes.push({ path: routePath, element: lazyPage(importFn) });
  }

  return routes;
}

const pageRoutes = buildRoutes();

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {pageRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route
        path="*"
        element={
          <Suspense>
            <NotFound />
          </Suspense>
        }
      />
    </Route>,
  ),
);
