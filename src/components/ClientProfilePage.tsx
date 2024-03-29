import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getAllProjectCardData, getClientById } from "../functions/requests";
import { Employee, IClientProfilePageState } from "../utils/interfaces";
import { sumProjectCardContractSize } from "../functions/aggregating";
import ProjectCard from "./ProjectCard";
import EmployeeRow from "./EmployeeRow";
import { formatProjectSize } from "../functions/formatting";
import { extractEmployeesFromProjects } from "../functions/dataTransformations";
import { clientProfilePageReducer } from "../functions/Page Specific/clientprofilepagefunctions";
import { alertError } from "../functions/errorhandling";

export default function ClientProfilePage(): JSX.Element {
  const { clientId } = useParams();
  const emptyClientProfilePage: IClientProfilePageState = {
    client: undefined,
    projects: [],
    employees: [],
    projectsView: true,
  };

  const [state, dispatch] = useReducer(
    clientProfilePageReducer,
    emptyClientProfilePage
  );
  const clientRevenue = formatProjectSize(
    sumProjectCardContractSize(state.projects).toString()
  );

  function UpdateView(viewClicked: "projects" | "employees"): void {
    if (viewClicked === "projects") {
      if (state.projectsView === false) {
        dispatch({ type: "toggleView", projectsViewShowing: false });
      }
    } else if (viewClicked === "employees") {
      if (state.projectsView === true) {
        dispatch({ type: "toggleView", projectsViewShowing: true });
      }
    }
  }

  useEffect(() => {
    if (clientId) {
      // get client info
      getClientById(clientId)
        .then((c) => dispatch({ type: "setClient", client: c }))
        .catch((e) => alertError(e));

      // get projectcards
      getAllProjectCardData()
        .then((pcd) => {
          const clientProjects = pcd.projectCards.filter(
            (p) => p.clientId === state.client?.id
          );
          dispatch({ type: "setProjects", projects: clientProjects });
          const clientEmployees: Employee[] =
            extractEmployeesFromProjects(clientProjects);
          dispatch({ type: "setEmployees", employees: clientEmployees });
        })
        .catch((e) => alertError(e));
    }
  }, [clientId, state.client?.id]);

  const toggleButtonStyles = (viewOn: boolean) => {
    const onStyle = { opacity: "1" };
    const offStyle = { opacity: "0.6" };
    return viewOn ? onStyle : offStyle;
  };

  return (
    <section className="flex flex-col w-10/12 justify-start items-center py-10 mb-20">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Client Profile
      </h1>
      <section className="w-10/12">
        <div className="flex flex-col justify-start items-start mb-12">
          <h1 className=" text-4xl font-bold m-0">{state.client?.name}</h1>
          <h2 className=" text-xl text-secondary-text m-0 font-semibold">
            {`${state.projects.length} projects completed, with ${state.employees.length} different employees`}
          </h2>
          <h2 className=" text-lg text-secondary-text m-0">
            {`${clientRevenue} generated in total`}
          </h2>
        </div>
        <div className="flex flex-row items-center justify-center">
          <button
            style={toggleButtonStyles(state.projectsView)}
            onClick={() => UpdateView("projects")}
            className=" cursor-pointer bg-accent-teal text-white font-semibold w-28 rounded-md mx-4 my-8 text-center align-middle"
          >
            View projects
          </button>
          <button
            style={toggleButtonStyles(!state.projectsView)}
            onClick={() => UpdateView("employees")}
            className=" cursor-pointer bg-accent-teal text-white font-semibold w-28 rounded-md mx-4 my-8 text-center align-middle"
          >
            View employees
          </button>
        </div>
      </section>
      {(state.projectsView && (
        <section className="flex flex-col w-full justify-center items-center">
          {state.projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </section>
      )) || (
        <section className="flex flex-col w-full justify-center items-start rounded-lg px-20">
          {state.employees.map((e) => (
            <EmployeeRow key={e.id} {...e} />
          ))}
        </section>
      )}
    </section>
  );
}
