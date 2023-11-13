import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LeaderBoard from "./components/Leaderboard";
import Home from "./components/Home";
import Play from "./components/Play";
import MapPage from "./components/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapPage />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/leader-board",
    element: <LeaderBoard />,
  },
]);

export function Main() {
  return <RouterProvider router={router} />;
}
