import { IProjectCard, IHomePageState } from "../utils/interfaces";
import moment from "moment";

export function testPredicates(
  project: IProjectCard,
  state: IHomePageState
): boolean {
  const searchTextAndDateTest =
    isSearchTextInProjectName(project, state) &&
    isProjectInDateRange(project, state);

  // the predicate below will only allow projects that have ALL the selected employees.
  // might change 'every' to some so that the project just has to have one of the selected employees.
  // which behaviour is more intuitive?
  // when no employees are filtered on, then it defaults to true.
  const filteredEmployees = state.filteredEmployees;
  const projectHasSelectedEmployees =
    filteredEmployees.length > 0
      ? filteredEmployees.every((e) => project.employeeIds.includes(e.id))
      : true;

  // this predicate will show projects that are one of the filtered clients
  const filteredClients = state.filteredClients;
  const projectHasSelectedClients =
    filteredClients.length > 0
      ? filteredClients.some((c) => project.clientId === c.id)
      : true;

  const test =
    searchTextAndDateTest &&
    projectHasSelectedEmployees &&
    projectHasSelectedClients;
  return test;
}

export function isSearchTextInProjectName(
  p: IProjectCard,
  state: IHomePageState
): boolean {
  const result = p.projectName
    .toUpperCase()
    .includes(state.searchText.trim().toUpperCase());
  return result;
}

export function isProjectInDateRange(
  p: IProjectCard,
  state: IHomePageState
): boolean {
  if (state.dateRange === undefined) {
    return true;
  } else {
    if (state.dateRange && state.dateRange[0] && state.dateRange[1]) {
      const dateIsInRange = moment(p.contract.startDate).isBetween(
        state.dateRange[0],
        state.dateRange[1],
        "day"
      );
      return dateIsInRange;
    }
    return true;
  }
}
