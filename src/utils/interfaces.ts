import { IHomePage } from "../components/HomePage";

export interface Client {
  id: string;
  name: string;
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
  state: IHomePage
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
