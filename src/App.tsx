import { TestingTailwind } from "./components/TestingTailwind";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import EmployeeProfile from "./components/EmployeeProfile";

function App(): JSX.Element {
  return (
    <div className="flex flex-row">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="employees">
            <Route index element={<TestingTailwind text={"This is Teams"} />} />
            <Route path=":employeeId" element={<EmployeeProfile />} />
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
