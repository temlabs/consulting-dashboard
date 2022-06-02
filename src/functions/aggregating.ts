import moment from "moment";
import { IProjectCard } from "../utils/interfaces";

export function sumProjectCardContractSize(projects: IProjectCard[]): number {
  const sum: number = projects.reduce(
    (prev, curr) => prev + parseFloat(curr.contract.size),
    0
  );
  return sum;
}

export function sumProjectCardDays(projects: IProjectCard[]): number {
  const totalDays: number = projects.reduce((prev, curr) => {
    const start = moment(curr.contract.startDate);
    const end = moment(curr.contract.endDate);
    const daysBetween = end.diff(start, "days");
    return prev + daysBetween;
  }, 0);
  return totalDays;
}
