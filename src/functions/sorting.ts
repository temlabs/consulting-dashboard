import moment from "moment";
import { IProjectCard } from "../utils/interfaces";
import { Sort } from "../utils/types";

export const sortingTypes: Sort[] = [
  {
    displayName: "Contract size ascending",
    sortPredicate: sortProjectsBySize,
    args: [true],
  },
  {
    displayName: "Contract size descending",
    sortPredicate: sortProjectsBySize,
    args: [false],
  },
  {
    displayName: "End date ascending",
    sortPredicate: sortProjectsByDate,
    args: [true, "endDate"],
  },
  {
    displayName: "End date descending",
    sortPredicate: sortProjectsByDate,
    args: [false, "endDate"],
  },
  {
    displayName: "Start date ascending",
    sortPredicate: sortProjectsByDate,
    args: [true, "startDate"],
  },
  {
    displayName: "Start date descending",
    sortPredicate: sortProjectsByDate,
    args: [false, "startDate"],
  },
];

function sortProjectsByDate(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean,
  dateType?: "startDate" | "endDate"
): 0 | 1 | -1 {
  const activeDateType = dateType !== undefined ? dateType : "startDate";
  const aBeforeB = moment(a.contract[activeDateType]).isBefore(
    moment(b.contract[activeDateType])
  );

  if (ascending) {
    return aBeforeB ? -1 : 1;
  } else {
    return aBeforeB ? 1 : -1;
  }
}

function sortProjectsBySize(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean
): number {
  console.log(a.contract.size, parseInt(a.contract.size));
  if (ascending) {
    return parseFloat(a.contract.size) - parseFloat(b.contract.size);
  } else {
    return parseFloat(b.contract.size) - parseFloat(a.contract.size);
  }
}
