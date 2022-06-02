import { Link } from "react-router-dom";
import { Client } from "../utils/interfaces";

export default function ClientRow(c: Client): JSX.Element {
  return (
    <>
      <Link className="w-full" to={`/clients/${c.id}`}>
        <div className=" shadow-lg flex flex-col cursor-pointer bg-white my-2 rounded-lg pl-8 h-40 w-full justify-center items-start transition-all  group">
          <div className="flex flex-row justify-start items-center py-2">
            <div className="flex flex-row items-baseline">
              <h1 className="mx-8 font-bold text-2xl group-hover:text-accent-teal transition-all">
                {c.name}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
