import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { docDetail, docList, profile, signin, signup } from "./types/routes";
import { DocList } from "./pages/docList";
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
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path={docList} element={<DocList />} />
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
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
