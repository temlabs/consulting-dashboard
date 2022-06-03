import { IProjectCard } from "../utils/interfaces";
import { Employee } from "../utils/interfaces";

/**
 * Returns a unique list of employees that featured in the supplied projects
 * @param projects
 * @returns
 */
export function extractEmployeesFromProjects(
  projects: IProjectCard[]
): Employee[] {
  // returns a unique list of employees that featured in the supplied projects
  const employeeList: Employee[] = [];

  projects.forEach((p) => {
    p.employees.forEach((e) => {
      if (e && employeeList.every((el) => el.id !== e?.id)) {
        employeeList.push(e);
      }
    });
  });
  return employeeList;
}
