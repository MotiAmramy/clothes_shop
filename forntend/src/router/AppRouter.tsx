import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";

interface AppRouterProps {
  readonly navigator: React.ReactNode;
}


/**
 * AppRouter Component
 * 
 * Manages the client-side routing of the application.
 * Wraps the application in BrowserRouter and defines accessible routes based on the config.
 * 
 * @param {AppRouterProps} props - Component props containing the navigator (layout/navbar)
 */
const AppRouter = ({ navigator }: AppRouterProps) => (
  <BrowserRouter>
    {navigator}
    <Routes>
      {config.map(({ path, component }) => (
        <Route key={path} path={path} Component={() => component} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
