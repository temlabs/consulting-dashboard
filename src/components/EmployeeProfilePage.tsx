import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getAllProjectCardData, getEmployeeById } from "../functions/requests";
import { IEmployeeProfilePageState } from "../utils/interfaces";
import ProjectCard from "./ProjectCard";
import { employeeProfilePagereducer } from "../functions/Page Specific/employeeprofilepagefunctions";
import { alertError } from "../functions/errorhandling";

export default function EmployeeProfilePage(): JSX.Element {
  const { employeeId } = useParams();
  const emptyEmployeeProfilePage: IEmployeeProfilePageState = {
    employee: undefined,
    employeeProjects: [],
  };
  const [state, dispatch] = useReducer(
    employeeProfilePagereducer,
    emptyEmployeeProfilePage
  );

  useEffect(() => {
    if (employeeId) {
      getEmployeeById(employeeId)
        .then((e) => dispatch({ type: "setEmployeeData", employeeData: e }))
        .catch((e) => alertError(e));
      getAllProjectCardData()
        .then((pcd) =>
          pcd.projectCards.filter((pcd) => pcd.employeeIds.includes(employeeId))
        )
        .then((pcd) =>
          dispatch({ type: "setProjectCardData", projectCards: pcd })
        )
        .catch((e) =>
          alertError(e, "Couldn't get the projects for this employee :(")
        );
    }
  }, [employeeId]);

  return (
    <section className="flex flex-col w-10/12 justify-start items-center">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Employee Profile
      </h1>
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
