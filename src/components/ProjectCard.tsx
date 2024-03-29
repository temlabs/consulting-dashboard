import { IProjectCard } from "../utils/interfaces";
import { formatProjectSize } from "../functions/formatting";
import { Link } from "react-router-dom";

export default function ProjectCard(props: IProjectCard): JSX.Element {
  const startDateSplit = props.contract.startDate.split(" ");
  const endDateSplit = props.contract.endDate.split(" ");
  const projectDates = `${startDateSplit.slice(1).join(" ")} - ${endDateSplit
    .slice(1)
    .join(" ")}`;

  const projectSize = formatProjectSize(props.contract.size);

  const numberOfEmployees = props.employeeIds.length;
  let numberOfEmployeesText =
    numberOfEmployees === 1 ? "employee" : "employees";
  numberOfEmployeesText =
    numberOfEmployees > 3
      ? `${numberOfEmployees} ${numberOfEmployeesText}, including:`
      : `${numberOfEmployees} ${numberOfEmployeesText}`;
  const displayEmployees = props.employees.slice(0, 3);

  return (
    <div className=" shadow-lg highlight hover:text-accent-teal bg-white flex flex-col px-3 py-3 w-10/12 h-40 mb-8 rounded-xl ">
      <div className="flex flex-row align-middle justify-between ">
        <div className="flex flex-row items-end">
          <Link to={`/projects/${props.id}`}>
            <h2 className=" cursor-pointer hover:text-accent-teal font-bold text-xl ">
              {props.projectName}
            </h2>
          </Link>
          <h3 className="text-secondary-text px-8">{projectDates}</h3>
        </div>
        <h2 className="font-bold text-xl mr-14">{projectSize}</h2>
      </div>
      <p className="text-secondary-text mt-2 text-sm">
        {numberOfEmployeesText}
      </p>
      <div className="flex flex-row mt-2 relative items-end">
        {displayEmployees.map((e) => (
          <span key={e?.id} className="group">
            <Link to={`/employees/${e?.id}`}>
              <img
                key={`${e?.id}-img`}
                src={e?.avatar}
                alt={e?.name}
                className=" rounded-full w-8 mx-1"
              />
            </Link>
            <p
              key={`${e?.id}-p`}
              className="absolute transition-opacity opacity-0 group-hover:opacity-70 bg-black text-white text-xs rounded-lg p-2"
            >
              {e?.name}
            </p>
          </span>
        ))}
        {numberOfEmployees > 3 && <p>...</p>}
      </div>
    </div>
  );
}
