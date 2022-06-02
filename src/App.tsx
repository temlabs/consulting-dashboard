import { TestingTailwind } from "./components/TestingTailwind";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import EmployeeProfilePage from "./components/EmployeeProfilePage";
import EmployeesPage from "./components/EmployeesPage";
import ClientProfilePage from "./components/ClientProfilePage";

function App(): JSX.Element {
  return (
    <div className="flex flex-row">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="employees">
            <Route index element={<EmployeesPage />} />
            <Route path=":employeeId" element={<EmployeeProfilePage />} />
          </Route>
          <Route path="clients">
            <Route
              index
              element={<TestingTailwind text={"This page doesn't exist yet"} />}
            />
            <Route path=":clientId" element={<ClientProfilePage />} />
          </Route>
          <Route
            path="*"
            element={<TestingTailwind text={"This is an Error Page"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
