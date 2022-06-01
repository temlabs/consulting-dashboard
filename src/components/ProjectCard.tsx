import { IProjectCard } from "../utils/interfaces";

export default function ProjectCard(props: IProjectCard): JSX.Element {
  const projectName = props.clientName;
  const projectDates = `${props.contract.startDate} - ${props.contract.endDate}`;
  const projectSize = `£${props.contract.size}`;
  const numberOfEmployees = props.employeeIds.length;
  let numberOfEmployeesText =
    numberOfEmployees === 1 ? "employee" : "employees";
  numberOfEmployeesText =
    numberOfEmployees > 3
      ? `${numberOfEmployees} ${numberOfEmployeesText}, including:`
      : `${numberOfEmployees} ${numberOfEmployeesText}`;
  const displayEmployees = props.employees.slice(0, 3);

  return (
    <div className=" hover:translate-x-6 bg-white flex flex-col px-3 py-3 w-10/12 h-40 mb-8 rounded-xl ">
      <div className="flex flex-row align-middle justify-between ">
        <div className="flex flex-row items-end">
          <h2 className=" font-bold text-xl ">{projectName}</h2>
          <h3 className="text-secondary-text px-8">{projectDates}</h3>
        </div>
        <h2 className="font-bold text-xl mr-14">{projectSize}</h2>
      </div>
      <p className="text-secondary-text mt-2 text-sm">
        {numberOfEmployeesText}
      </p>
      <div className="flex flex-row mt-2 relative items-end">
        {displayEmployees.map((e) => (
          <span key={e?.id}>
            <img
              key={`${e?.id}-img`}
              src={e?.avatar}
              alt={e?.name}
              className=" rounded-full w-8 mx-1"
            />
            <p
              key={`${e?.id}-p`}
              className="absolute opacity-0 group-hover:opacity-100"
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
