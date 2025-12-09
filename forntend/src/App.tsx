import Navigation from "./components/Navigation/Navigation";
import CategoryNavbar from "./components/Navigation/CategoryNavbar";
import AppRouter from "./router/AppRouter";

const App = () => (
      <AppRouter navigator={
            <>
                  <Navigation />
                  <CategoryNavbar />
            </>
      } />
)

export default App;
