import { HomePage } from "../components/HomePage";

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

export interface IProjectCardPredicate {
  id: string;
  func: (p: IProjectCard, state: HomePage) => boolean;
};

export interface ProjectComposite {
  projectCards: IProjectCard[];
  clients: Client[];
  employees: Employee[];
}