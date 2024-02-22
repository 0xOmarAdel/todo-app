import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import MainLayout from "./layout/MainLayout";
import RegisterPage from "./pages/SignupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<TodosPage />} />
        </Route>
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
