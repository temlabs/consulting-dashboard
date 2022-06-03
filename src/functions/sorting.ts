import moment from "moment";
import { IProjectCard, Sort } from "../utils/interfaces";

export const sortingTypes: Sort[] = [
  {
    displayName: "Contract size ascending",
    sortPredicate: sortProjectsBySize,
    ascending: true,
  },
  {
    displayName: "Contract size descending",
    sortPredicate: sortProjectsBySize,
    ascending: false,
  },

  {
    displayName: "Employee count ascending",
    sortPredicate: sortProjectsByEmployeeCount,
    ascending: true,
  },
  {
    displayName: "Employee count descending",
    sortPredicate: sortProjectsByEmployeeCount,
    ascending: false,
  },
  {
    displayName: "End date ascending",
    sortPredicate: sortProjectsByEndDate,
    ascending: true,
  },
  {
    displayName: "End date descending",
    sortPredicate: sortProjectsByEndDate,
    ascending: false,
  },
  {
    displayName: "Name A-Z",
    sortPredicate: sortProjectsByName,
    ascending: false,
  },
  {
    displayName: "Name Z-A",
    sortPredicate: sortProjectsByName,
    ascending: true,
  },
  {
    displayName: "Start date ascending",
    sortPredicate: sortProjectsByStartDate,
    ascending: true,
  },
  {
    displayName: "Start date descending",
    sortPredicate: sortProjectsByStartDate,
    ascending: false,
  },
];

function sortProjectsByStartDate(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean
): 0 | 1 | -1 {
  const aBeforeB = moment(a.contract.startDate).isBefore(
    moment(b.contract.startDate)
  );

  if (ascending) {
    return aBeforeB ? -1 : 1;
  } else {
    return aBeforeB ? 1 : -1;
  }
}

function sortProjectsByEndDate(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean
): 0 | 1 | -1 {
  const aBeforeB = moment(a.contract.endDate).isBefore(
    moment(b.contract.endDate)
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
  if (ascending) {
    return parseFloat(a.contract.size) - parseFloat(b.contract.size);
  } else {
    return parseFloat(b.contract.size) - parseFloat(a.contract.size);
  }
}

function sortProjectsByName(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean
): number {
  const aBeforeB = a.projectName > b.projectName;

  if (ascending) {
    return aBeforeB ? -1 : 1;
  } else {
    return aBeforeB ? 1 : -1;
  }
}

function sortProjectsByEmployeeCount(
  a: IProjectCard,
  b: IProjectCard,
  ascending: boolean
): number {
  return ascending
    ? a.employeeIds.length - b.employeeIds.length
    : b.employeeIds.length - a.employeeIds.length;
}
