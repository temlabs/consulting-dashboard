import { useEffect, useReducer } from "react";
import { getAllEmployees } from "../functions/requests";
import { Employee } from "../utils/interfaces";
import EmployeeRow from "./EmployeeRow";

interface IEmployeesPage {
  employees: Employee[];
}

type EmployeesPageAction = { type: "setEmployees"; employeeList: Employee[] };

function reducer(
  state: IEmployeesPage,
  action: EmployeesPageAction
): IEmployeesPage {
  switch (action.type) {
    case "setEmployees":
      return { ...state, employees: action.employeeList };
    default:
      return state;
  }
}

export default function EmployeesPage(): JSX.Element {
  const empyEmployeesPage: IEmployeesPage = { employees: [] };

  const [state, dispatch] = useReducer(reducer, empyEmployeesPage);

  useEffect(() => {
    getAllEmployees().then((e) =>
      dispatch({ type: "setEmployees", employeeList: e })
    );
  }, []);

  return (
    <section className="flex flex-col w-10/12 justify-start items-center rounded-lg px-20">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Employees List
      </h1>
      {state.employees.map((e) => (
        <EmployeeRow key={e.id} {...e} />
      ))}
    </section>
  );
}
