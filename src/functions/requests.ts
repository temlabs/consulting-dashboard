/**
    /clients
    /clients/{clientId}
    /employees
    /employees/{employeeId}
    /projects
    /projects/{projectId}

*/

import { Project } from "../utils/interfaces";

import { projectsURL as projects } from "./../utils/endpoints";

export async function getProjects(projectsURL = projects): Promise<Project[]> {
  try {
    const projectsResponse = await fetch(projectsURL);
    const allProjects: Promise<Project[]> = projectsResponse.json();
    return allProjects;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw Error(errorMessage);
  }
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
