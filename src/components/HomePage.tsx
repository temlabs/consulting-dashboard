import { useEffect, useState } from "react";
import { getAllProjectCardData } from "../functions/requests";
import { ProjectCard } from "../utils/interfaces";

export default function HomePage(): JSX.Element {
  const [projectCards, setProjectCards] = useState<ProjectCard[]>();

  useEffect(() => {
    getAllProjectCardData()
      .then((pcd) => setProjectCards(pcd.projectCards))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className=" flex flex-col">
      <h1> Home Page</h1>
      {projectCards?.map((p) => (
        <span key={p.id}> {`${p.clientName} ${p.contract.startDate}`}</span>
      ))}
    </div>
  );
}
