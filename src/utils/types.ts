import {
  Employee,
  ProjectComposite,
  Client,
  IProjectSortPredicate,
} from "./interfaces";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

export type HomePageAction =
  | { type: "addEmployeesToFilter"; employeeToAdd: Employee[] }
  | { type: "removeEmployeeFromFilter"; employeeToRemove: Employee }
  | { type: "addClientsToFilter"; clientToAdd: Client[] }
  | { type: "removeClientFromFilter"; clientToREmove: Client }
  | { type: "setData"; data: ProjectComposite }
  | { type: "setSearchText"; newSearchText: string }
  | { type: "setDateRange"; newDateRange: RangeValue<Moment> | undefined }
  | { type: "setSort"; newSort: Sort };

export type Dispatch = (action: HomePageAction) => void;

export interface Sort {
  displayName: string;
  sortPredicate: IProjectSortPredicate;
  ascending: boolean;
}
