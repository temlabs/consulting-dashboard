import { IProjectCard } from "../utils/interfaces";

export function sumProjectCardContractSize(projects: IProjectCard[]): number {
  const sum: number = projects.reduce(
    (prev, curr) => prev + parseFloat(curr.contract.size),
    0
  );
  return sum;
}
