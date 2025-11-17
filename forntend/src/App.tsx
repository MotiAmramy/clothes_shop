import Navigation from "./components/Navigation/Navigation";
import AppRouter from "./router/AppRouter";

const App = () => (
      <AppRouter navigator={<Navigation />} />
)

export default App;
