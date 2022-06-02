import {
  Employee,
  ProjectComposite,
  Client,
  IProjectSortPredicate,
} from "./interfaces";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

export type Action =
  | { type: "addEmployeeToFilter"; employeeToAdd: Employee }
  | { type: "removeEmployeeFromFilter"; employeeToRemove: Employee }
  | { type: "addClientToFilter"; clientToAdd: Client }
  | { type: "removeClientFromFilter"; clientToREmove: Client }
  | { type: "setData"; data: ProjectComposite }
  | { type: "setSearchText"; newSearchText: string }
  | { type: "setDateRange"; newDateRange: RangeValue<Moment> | undefined }
  | { type: "setSort"; newSort: Sort };

export type Dispatch = (action: Action) => void;

export interface Sort {
  displayName: string;
  sortPredicate: IProjectSortPredicate;
  args: [boolean, ("startDate" | "endDate" | undefined)?];
}
