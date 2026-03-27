import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Analysis from "./pages/Analysis";
import ChartUpload from "./pages/ChartUpload";
import Dashboard from "./pages/Dashboard";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analysis",
  component: Analysis,
});

const chartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chart",
  component: ChartUpload,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const upgradeSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upgrade-success",
  component: () => (
    <main className="gradient-hero min-h-screen flex items-center justify-center">
      <div className="bg-card-surface rounded-xl border border-signal-green/30 p-8 text-center max-w-md">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Premium Upgrade Successful!
        </h2>
        <p className="text-secondary text-sm">
          Ab aapke paas unlimited AI analysis access hai. Happy trading! 🚀
        </p>
      </div>
    </main>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  analysisRoute,
  chartRoute,
  aboutRoute,
  adminRoute,
  upgradeSuccessRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
