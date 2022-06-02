import { useEffect, useReducer } from "react";
import { getAllProjectCardData } from "../functions/requests";
import {
  Client,
  Employee,
  IProjectCard,
  IProjectCardPredicate,
} from "../utils/interfaces";
import { Action, Sort } from "../utils/types";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import {
  testPredicates,
  isSearchTextInProjectName,
  isProjectInDateRange,
} from "../functions/filtering";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { sortingTypes } from "../functions/sorting";

export interface IHomePage {
  projectCards: IProjectCard[];
  clients: Client[];
  employees: Employee[];
  filterPreds: IProjectCardPredicate[];
  searchText: string;
  searchTextPredicate: IProjectCardPredicate;
  dateRange: RangeValue<Moment> | undefined;
  dateRangePredicate: IProjectCardPredicate;
  filteredEmployees: Employee[];
  filteredClients: Client[];
  sort: Sort;
}

function reducer(state: IHomePage, action: Action): IHomePage {
  switch (action.type) {
    case "addClientToFilter":
      return {
        ...state,
        filteredClients: [...state.filteredClients, action.clientToAdd],
      };
    case "removeClientFromFilter":
      return {
        ...state,
        filteredClients: state.filteredClients.filter(
          (c) => c.id !== action.clientToREmove.id
        ),
      };
    case "addEmployeeToFilter":
      return {
        ...state,
        filteredEmployees: [...state.filteredEmployees, action.employeeToAdd],
      };
    case "removeEmployeeFromFilter":
      return {
        ...state,
        filteredEmployees: state.filteredEmployees.filter(
          (e) => e.id !== action.employeeToRemove.id
        ),
      };
    case "setSearchText":
      return { ...state, searchText: action.newSearchText };
    case "setDateRange":
      return { ...state, dateRange: action.newDateRange };
    case "setSort":
      return { ...state, sort: action.newSort };
    case "setData":
      return {
        ...state,
        projectCards: action.data.projectCards,
        clients: action.data.clients,
        employees: action.data.employees,
      };
    default:
      return state;
  }
}

export default function HomePage(): JSX.Element {
  const initialHomePage: IHomePage = {
    projectCards: [],
    clients: [],
    employees: [],
    filterPreds: [],
    searchText: "",
    searchTextPredicate: isSearchTextInProjectName,
    dateRange: undefined,
    dateRangePredicate: isProjectInDateRange,
    filteredClients: [],
    filteredEmployees: [],
    sort: sortingTypes[0],
  };
  const [state, dispatch] = useReducer(reducer, initialHomePage);

  useEffect(() => {
    getAllProjectCardData()
      .then((pcd) => dispatch({ type: "setData", data: pcd }))
      .catch((e) => console.log(e));
  }, []);

  const callSort = (a: IProjectCard, b: IProjectCard) => {
    const argsArr = state.sort.args;
    if (argsArr[1]) {
      return state.sort.sortPredicate(a, b, argsArr[0], argsArr[1]);
    } else {
      return state.sort.sortPredicate(a, b, argsArr[0]);
    }
  };
  const projectCardsOnDisplay = state.projectCards
    .filter((p) => testPredicates(p, state))
    .sort((a, b) => callSort(a, b));
  const numberOfProjectsShowing = `${projectCardsOnDisplay.length} projects showing of ${state.projectCards.length}`;

  return (
    <div className=" flex flex-col w-full">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Home Page
      </h1>

      <section className=" flex flex-col w-full items-center">
        <FilterBar state={state} dispatch={dispatch}>
          {numberOfProjectsShowing}
        </FilterBar>

        {projectCardsOnDisplay.map((p) => (
          <ProjectCard key={p.id} {...p}></ProjectCard>
        ))}
      </section>
    </div>
  );
}
