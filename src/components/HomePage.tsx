import { useEffect, useState } from "react";
import { getProjects } from "../functions/requests";
import { Project } from "../utils/interfaces";

export default function HomePage(): JSX.Element {
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    const testProjects = async () => {
      try {
        const projectsResponse: Project[] = await getProjects();
        setProjectList(projectsResponse);
      } catch (error) {
        console.log(error);
      }
    };

    testProjects();
  }, []);

  return (
    <div className=" flex flex-col">
      <h1> Home Page</h1>
      {projectList.map((p) => (
        <div key={p.id}>{p.id}</div>
      ))}
    </div>
  );
}
