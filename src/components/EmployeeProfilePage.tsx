import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getAllProjectCardData, getEmployeeById } from "../functions/requests";
import { Employee, IProjectCard } from "../utils/interfaces";
import ProjectCard from "./ProjectCard";
// test id 3ece4f9f06bdaf25dcdca53b
interface IEmployeeProfilePage {
  employee: Employee | undefined;
  employeeProjects: IProjectCard[];
}

type EmployeeProfilePageAction =
  | { type: "setEmployeeData"; employeeData: Employee }
  | { type: "setProjectCardData"; projectCards: IProjectCard[] };

function reducer(
  state: IEmployeeProfilePage,
  action: EmployeeProfilePageAction
): IEmployeeProfilePage {
  switch (action.type) {
    case "setEmployeeData":
      return { ...state, employee: action.employeeData };
    case "setProjectCardData":
      return { ...state, employeeProjects: action.projectCards };
    default:
      return state;
  }
}

export default function EmployeeProfilePage(): JSX.Element {
  const { employeeId } = useParams();
  const emptyEmployeeProfilePage: IEmployeeProfilePage = {
    employee: undefined,
    employeeProjects: [],
  };
  const [state, dispatch] = useReducer(reducer, emptyEmployeeProfilePage);

  useEffect(() => {
    if (employeeId) {
      getEmployeeById(employeeId).then((e) =>
        dispatch({ type: "setEmployeeData", employeeData: e })
      ); // dispatch
      getAllProjectCardData()
        .then((pcd) =>
          pcd.projectCards.filter((pcd) => pcd.employeeIds.includes(employeeId))
        )
        .then((pcd) =>
          dispatch({ type: "setProjectCardData", projectCards: pcd })
        ); // dispatch
    }
  }, [employeeId]);

  return (
    <section className="flex flex-col w-10/12 justify-center items-center">
      <section className="flex flex-row justify-start items-center w-10/12 py-10">
        <img
          src={state.employee?.avatar}
          alt={`${state.employee?.name}`}
          className=" rounded-full w-36 border-primary-light border-8 border-solid"
        />
        <div className="ml-10 flex flex-col">
          <h1 className=" font-bold text-2xl m-0">{state.employee?.name}</h1>
          <h3 className=" font-semibold text-xl m-0">{state.employee?.role}</h3>
          <h3 className=" font-semibold text-xl m-0 ">{`${state.employeeProjects.length} projects`}</h3>
        </div>
      </section>
      {state.employeeProjects.map((p) => (
        <ProjectCard key={p.id} {...p} />
      ))}
    </section>
  );
}
