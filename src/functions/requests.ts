/**
    /clients
    /clients/{clientId}
    /employees
    /employees/{employeeId}
    /projects
    /projects/{projectId}

*/

import { Project, IProjectCard, Employee, Client } from "../utils/interfaces";
import { formatProjectName } from "./formatting"

import { projectsURL, clientsURL, employeesURL } from "./../utils/endpoints";

// PROJECTS
export async function getAllProjects(): Promise<Project[]> {
  try {
    const allProjects: Project[] = await get<Project[]>(projectsURL);
    return allProjects;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

export async function getProjectById(projectId: string): Promise<Project> {
  try {
    const project: Project = await get<Project>(`${projectsURL}/${projectId}`);
    if (Object.keys(project).length === 0) {
      throw Error(`There exists no project with the id: ${projectId}`);
    }
    return project;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

// CLIENTS
export async function getAllClients(): Promise<Client[]> {
  try {
    const allClients: Client[] = await get<Client[]>(clientsURL);
    return allClients;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

export async function getClientById(clientId: string): Promise<Client> {
  try {
    const client: Client = await get<Client>(`${clientsURL}/${clientId}`);
    if (Object.keys(client).length === 0) {
      throw Error(`There exists no client with the id: ${clientId}`);
    }
    return client;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

// EMPLOYEES
export async function getAllEmployees(): Promise<Employee[]> {
  try {
    const allEmployees: Employee[] = await get<Employee[]>(employeesURL);
    return allEmployees;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

export async function getEmployeeById(employeeId: string): Promise<Employee> {
  try {
    const employee: Employee = await get<Employee>(
      `${employeesURL}/${employeeId}`
    );
    if (Object.keys(employee).length === 0) {
      throw Error(`There exists no employee with the id: ${employeeId}`);
    }
    return employee;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

async function projectToProjectCard(project: Project): Promise<IProjectCard> {
  try {
    const clientName = (await getClientById(project.clientId)).name;
    const employeeIds = project.employeeIds;
    const employees: Employee[] = await Promise.all(
      employeeIds.map(async (eid) => await getEmployeeById(eid))
    );
    const projectName = formatProjectName(clientName, project.contract.startDate)
    const projectCardData: IProjectCard = { ...project, clientName, employees, projectName };
    return projectCardData;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

//PROJECT CARD

// export async function getAllProjectCardData(): Promise<ProjectCard[]> {

//     try {
//         const allProjects: Project[] = await getAllProjects()
//         const allProjectCards: ProjectCard[] = await Promise.all(allProjects.map(projectToProjectCard))
//         return allProjectCards
//     } catch (error) {
//         const errorMessage = getErrorMessage(error);
//         throw Error(errorMessage);
//     }
// }

export async function getAllProjectCardData(): Promise<{
  projectCards: IProjectCard[];
  clients: Client[];
  employees: Employee[];
}> {
  const allProjects = await getAllProjects();
  const allClients = await getAllClients();
  const allEmployees = await getAllEmployees();

  const allProjectCards: IProjectCard[] = allProjects.map((p) => {
    const clientName = allClients.find((c) => c.id === p.clientId)?.name;
    const employees = p.employeeIds.map((eid) => {
      const employee = allEmployees.find((e) => e.id === eid);
      return employee;
    });

    const projectName = formatProjectName(clientName ?? 'Client Unknown', p.contract.startDate)
    const projectCard: IProjectCard = { ...p, clientName, employees, projectName };
    return projectCard;
  });

  const returnObject = {
    projectCards: allProjectCards,
    clients: allClients,
    employees: allEmployees,
  };
  return returnObject;
}

export async function getProjectCardDataById(
  projectId: string
): Promise<IProjectCard> {
  try {
    const project: Project = await getProjectById(projectId);
    const projectCard: IProjectCard = await projectToProjectCard(project);
    return projectCard;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
}

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data: Promise<T> = response.json();
  return data;
}

function errorHasMessage(error: unknown): boolean {
  return typeof error === "object" && error !== null && "message" in error;
}

function getErrorMessage(error: unknown): string {
  if (errorHasMessage(error)) {
    return (error as Error).message;
  } else {
    return JSON.stringify(error);
  }
}
