import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";

interface AppRouterProps {
  readonly navigator: React.ReactNode;
}

const AppRouter = ({ navigator }: AppRouterProps) => (
  <BrowserRouter>
    { navigator }
    <Routes>
      {config.map(({ path, component }) => (
        <Route key={path} path={path} Component={() => component} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
