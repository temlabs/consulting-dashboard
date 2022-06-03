import {
  Employee,
  ProjectComposite,
  Client,
  Sort,
  IProjectCard,
} from "./interfaces";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

export type ClientProfilePageActions =
  | { type: "setProjects"; projects: IProjectCard[] }
  | { type: "setEmployees"; employees: Employee[] }
  | { type: "setClient"; client: Client }
  | { type: "toggleView"; projectsViewShowing: boolean };

export type EmployeeProfilePageAction =
  | { type: "setEmployeeData"; employeeData: Employee }
  | { type: "setProjectCardData"; projectCards: IProjectCard[] };

export type HomePageAction =
  | { type: "addEmployeesToFilter"; employeeToAdd: Employee[] }
  | { type: "removeEmployeeFromFilter"; employeeToRemove: Employee }
  | { type: "addClientsToFilter"; clientToAdd: Client[] }
  | { type: "removeClientFromFilter"; clientToREmove: Client }
  | { type: "setData"; data: ProjectComposite }
  | { type: "setSearchText"; newSearchText: string }
  | { type: "setDateRange"; newDateRange: RangeValue<Moment> | undefined }
  | { type: "setSort"; newSort: Sort };

export type HomePageDispatch = (action: HomePageAction) => void;
