import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { docDetail, home, profile, signin, signup } from "./types/routes";
import { Home } from "./pages/home";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { AuthContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Protect } from "./components/Protect";
import { DocDetail } from "./pages/docDetail";

const client = new QueryClient();
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <NavBar />
          <Routes>
            <Route path={home} element={<Home />} />
            <Route path={docDetail} element={<DocDetail />} />
            <Route path={signin} element={<Signin />} />
            <Route path={signup} element={<Signup />} />
            <Route
              path={profile}
              element={
                <Protect>
                  <Profile />
                </Protect>
              }
            />
          </Routes>
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
