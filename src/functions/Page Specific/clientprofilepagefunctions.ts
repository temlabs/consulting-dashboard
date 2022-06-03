import { IClientProfilePageState } from "../../utils/interfaces";
import { ClientProfilePageActions } from "../../utils/types";

export function clientProfilePageReducer(
  state: IClientProfilePageState,
  action: ClientProfilePageActions
): IClientProfilePageState {
  switch (action.type) {
    case "setClient":
      return { ...state, client: action.client };
    case "setProjects":
      return { ...state, projects: action.projects };
    case "setEmployees":
      return { ...state, employees: action.employees };
    case "toggleView":
      return { ...state, projectsView: !state.projectsView };
    default:
      return state;
  }
}
