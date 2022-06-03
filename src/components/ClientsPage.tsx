import { useEffect, useReducer } from "react";
import { getAllClients } from "../functions/requests";
import { Client } from "../utils/interfaces";
import ClientRow from "./ClientRow";

interface IClientsPage {
  clients: Client[];
}

type ClientsPageAction = { type: "setClients"; clientList: Client[] };

function reducer(state: IClientsPage, action: ClientsPageAction): IClientsPage {
  switch (action.type) {
    case "setClients":
      return { ...state, clients: action.clientList };
    default:
      return state;
  }
}

export default function ClientsPage(): JSX.Element {
  const empyEmployeesPage: IClientsPage = { clients: [] };

  const [state, dispatch] = useReducer(reducer, empyEmployeesPage);

  useEffect(() => {
    getAllClients().then((c) =>
      dispatch({ type: "setClients", clientList: c })
    );
  }, []);

  return (
    <section className="flex flex-col w-10/12 justify-start items-center rounded-lg px-20 mb-20">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Clients List
      </h1>
      {state.clients.map((c) => (
        <ClientRow key={c.id} {...c} />
      ))}
    </section>
  );
}
