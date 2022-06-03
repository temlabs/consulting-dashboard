import { useEffect, useReducer } from "react";
import { getAllProjectCardData } from "../functions/requests";
import {
  Client,
  Employee,
  IProjectCard,
  IProjectCardPredicate,
} from "../utils/interfaces";
import { HomePageAction, Sort } from "../utils/types";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import {
  testPredicates,
  isSearchTextInProjectName,
  isProjectInDateRange,
} from "../functions/filtering";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { sortingTypes } from "../functions/sorting";
import KPICard from "./KPICard";
import {
  sumProjectCardContractSize,
  sumProjectCardDays,
} from "../functions/aggregating";
import { formatProjectSize } from "../functions/formatting";

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

function init(preInitialState: IHomePage): IHomePage {
  const savedFromDate = sessionStorage.getItem("fromDate");
  const savedToDate = sessionStorage.getItem("toDate");
  let initialDateRange = undefined;
  if (savedToDate && savedFromDate) {
    initialDateRange = [
      moment(savedFromDate),
      moment(savedToDate),
    ] as RangeValue<Moment>;
  }
  const savedSortDisplayName = sessionStorage.getItem("sort");
  const initialSort: Sort =
    sortingTypes.find((s) => s.displayName === savedSortDisplayName) ||
    sortingTypes[0];

  const initalisedState = {
    ...preInitialState,
    searchText: sessionStorage.getItem("searchText") || "",
    dateRange: initialDateRange,
    filteredClients: JSON.parse(
      sessionStorage.getItem("filteredClients") || "[]"
    ),
    filteredEmployees: JSON.parse(
      sessionStorage.getItem("filteredEmployees") || "[]"
    ),
    sort: initialSort,
  };

  return initalisedState;
}

function reducer(state: IHomePage, action: HomePageAction): IHomePage {
  switch (action.type) {
    case "addClientsToFilter":
      return {
        ...state,
        filteredClients: [...state.filteredClients, ...action.clientToAdd],
      };
    case "removeClientFromFilter":
      return {
        ...state,
        filteredClients: state.filteredClients.filter(
          (c) => c.id !== action.clientToREmove.id
        ),
      };
    case "addEmployeesToFilter":
      return {
        ...state,
        filteredEmployees: [
          ...state.filteredEmployees,
          ...action.employeeToAdd,
        ],
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
  const [state, dispatch] = useReducer(reducer, initialHomePage, init);

  useEffect(() => {
    getAllProjectCardData()
      .then((pcd) => dispatch({ type: "setData", data: pcd }))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    //save filtering and sorting to local storage on change
    sessionStorage.setItem("searchText", state.searchText);
    if (state.dateRange && state.dateRange[0] && state.dateRange[1]) {
      sessionStorage.setItem("fromDate", state.dateRange[0]?.format());
      sessionStorage.setItem("toDate", state.dateRange[1]?.format());
    }

    sessionStorage.setItem(
      "filteredClients",
      state.filteredClients.map((c) => JSON.stringify(c)).join(",")
    );
    sessionStorage.setItem(
      "filteredEmployees",
      state.filteredEmployees.map((e) => JSON.stringify(e)).join(",")
    );
    sessionStorage.setItem("sort", state.sort.displayName);
  }, [
    state.dateRange,
    state.searchText,
    state.sort,
    state.filteredClients,
    state.filteredEmployees,
  ]);

  const projectCardsOnDisplay = state.projectCards
    .filter((p) => testPredicates(p, state))
    .sort((a, b) => state.sort.sortPredicate(a, b, state.sort.ascending));

  const numberOfProjectsShowing = `${projectCardsOnDisplay.length} projects showing of ${state.projectCards.length}`;
  const totalRevenueFromProjectsShowing = formatProjectSize(
    sumProjectCardContractSize(projectCardsOnDisplay).toString()
  );
  const revenueDescription = "Total revenue generated in date range";

  const numberOfWorkingDays = sumProjectCardDays(projectCardsOnDisplay);
  const numberOfWorkingDaysDescription =
    "Total days spent on projects in date range";

  return (
    <div className=" flex flex-col w-10/12 justify-start items-center">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Home Page
      </h1>
      <section className=" flex flex-row w-10/12 items-center justify-start my-16">
        <KPICard
          mainFigure={totalRevenueFromProjectsShowing}
          description={revenueDescription}
        />
        <KPICard
          mainFigure={numberOfWorkingDays.toString()}
          description={numberOfWorkingDaysDescription}
        />
      </section>

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
