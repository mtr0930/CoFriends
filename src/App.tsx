import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
