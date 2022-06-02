import { Link } from "react-router-dom";
import { Employee } from "../utils/interfaces";

export default function EmployeeRow(e: Employee): JSX.Element {
  return (
    <>
      <Link className="w-full" to={`/employees/${e.id}`}>
        <div className="flex flex-col cursor-pointer bg-white my-2 rounded-lg pl-8 h-40 w-full justify-center items-start transition-all  group">
          <div className="flex flex-row justify-start items-center py-2">
            <img
              src={e.avatar}
              alt={e.name}
              className="w-24 rounded-full border-primary-light border-4 border-solid group-hover:border-accent-teal transition-all"
            />
            <div className="flex flex-row items-baseline">
              <h1 className="mx-8 font-bold text-2xl group-hover:text-accent-teal transition-all">
                {e.name}
              </h1>
              <h3 className="font-semibold group-hover:text-accent-teal text-lg transition-all">
                {e.role}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
