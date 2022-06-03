import { IEmployeeProfilePageState } from "../../utils/interfaces";
import { EmployeeProfilePageAction } from "../../utils/types";

export function employeeProfilePagereducer(
  state: IEmployeeProfilePageState,
  action: EmployeeProfilePageAction
): IEmployeeProfilePageState {
  switch (action.type) {
    case "setEmployeeData":
      return { ...state, employee: action.employeeData };
    case "setProjectCardData":
      return { ...state, employeeProjects: action.projectCards };
    default:
      return state;
  }
}
