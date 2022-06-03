import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

export interface Client {
  id: string;
  name: string;
}

export interface IClientProfilePageState {
  client: Client | undefined;
  projects: IProjectCard[];
  employees: Employee[];
  projectsView: boolean;
}

export interface Contract {
  startDate: string;
  endDate: string;
  size: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface IEmployeeProfilePageState {
  employee: Employee | undefined;
  employeeProjects: IProjectCard[];
}

export interface IHomePageState {
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

export interface Project {
  id: string;
  clientId: string;
  employeeIds: string[];
  contract: Contract;
}

export interface IProjectCard extends Project {
  clientName: string | undefined;
  employees: (Employee | undefined)[];
  projectName: string;
}

export type IProjectCardPredicate = (
  p: IProjectCard,
  state: IHomePageState
) => boolean;
export type IProjectSortPredicate = (
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean,
  dateType?: "startDate" | "endDate"
) => number;

export interface ProjectComposite {
  projectCards: IProjectCard[];
  clients: Client[];
  employees: Employee[];
}

export interface Sort {
  displayName: string;
  sortPredicate: IProjectSortPredicate;
  ascending: boolean;
}
