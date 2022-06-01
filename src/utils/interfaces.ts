export interface Contract {
  startDate: string;
  endDate: string;
  size: string;
}

export interface Project {
  id: string;
  clientid: string;
  employeeids: string[];
  contract: Contract;
}
