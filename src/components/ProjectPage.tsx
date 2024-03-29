import moment from "moment";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { alertError } from "../functions/errorhandling";
import { formatProjectSize } from "../functions/formatting";
import { getProjectCardDataById } from "../functions/requests";
import { Contract, Employee, IProjectCard } from "../utils/interfaces";
import EmployeeRow from "./EmployeeRow";

interface IProjectPage {
  clientId: string;
  clientName: string | undefined;
  id: string;
  projectName: string;
  employeeIds: string[];
  employees: (Employee | undefined)[];
  contract: Contract | undefined;
}

type ProjectPageActions = { type: "setProjectCard"; projectCard: IProjectCard };

function reducer(
  state: IProjectPage,
  action: ProjectPageActions
): IProjectPage {
  switch (action.type) {
    case "setProjectCard":
      return {
        ...state,
        clientId: action.projectCard.clientId,
        clientName: action.projectCard.clientName,
        id: action.projectCard.id,
        projectName: action.projectCard.projectName,
        employeeIds: action.projectCard.employeeIds,
        employees: action.projectCard.employees,
        contract: action.projectCard.contract,
      };
    default:
      return state;
  }
}

export default function ProjectPage(): JSX.Element {
  const { projectId } = useParams();

  const emptyProjectPage: IProjectPage = {
    clientId: "",
    clientName: "",
    id: "",
    projectName: "",
    employeeIds: [],
    employees: [],
    contract: undefined,
  };

  const [state, dispatch] = useReducer(reducer, emptyProjectPage);

  useEffect(() => {
    if (projectId) {
      getProjectCardDataById(projectId)
        .then((p) => dispatch({ type: "setProjectCard", projectCard: p }))
        .catch((e) => alertError(e));
    }
  });

  const projectRevenue = state.contract
    ? formatProjectSize(state.contract?.size)
    : "£0";
  const projectDates = `${moment(state.contract?.startDate).format(
    "ll"
  )} - ${moment(state.contract?.endDate).format("ll")}`;
  const projectEmployees = `${state.employeeIds.length} employees featured`;

  return (
    <section className="flex flex-col w-10/12 justify-start items-center py-10 mb-20">
      <h1 className=" font-bold text-2xl text-tertiary-text mb-5 opacity-40">
        Project Profile
      </h1>
      <section className="w-10/12 mb-12">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col justify-start items-start">
            <h1 className=" text-4xl font-bold m-0">{state.projectName}</h1>
            <Link to={`/clients/${state.clientId}`}>
              <h2 className=" text-xl m-0 font-semibold text-blue-700 hover:underline">
                {state.clientName}
              </h2>
            </Link>
            <h2 className=" text-lg text-secondary-text m-0">
              {`${projectDates}`}
            </h2>
          </div>
          <h1 className=" font-bold text-4xl ">{projectRevenue}</h1>
        </div>
      </section>

      <section className="flex flex-col w-10/12 justify-start items-center">
        {state.employees && (
          <>
            <h1 className=" font-semibold text-lg">{projectEmployees}</h1>
            {state.employees.map((e) =>
              e !== undefined ? <EmployeeRow key={e.id} {...e} /> : undefined
            )}
          </>
        )}
      </section>
    </section>
  );
}
