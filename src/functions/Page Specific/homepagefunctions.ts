import { IHomePageState, IProjectCard, Sort } from "../../utils/interfaces";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { sortingTypes } from "../sorting";
import { HomePageAction } from "../../utils/types";
import { testPredicates } from "../filtering";

export function initialiseHomePage(
  preInitialState: IHomePageState
): IHomePageState {
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

export function homePageReducer(
  state: IHomePageState,
  action: HomePageAction
): IHomePageState {
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

export function saveFiltersToSessionStorage(state: IHomePageState): void {
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
}

export function filterAndSortProjectCards(
  state: IHomePageState
): IProjectCard[] {
  return state.projectCards
    .filter((p) => testPredicates(p, state))
    .sort((a, b) => state.sort.sortPredicate(a, b, state.sort.ascending));
}
