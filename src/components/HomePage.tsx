import { useEffect, useState } from "react";
import { getAllProjectCardData } from "../functions/requests";
import { IProjectCard } from "../utils/interfaces";
import ProjectCard from "./ProjectCard";

export default function HomePage(): JSX.Element {
  const [projectCards, setProjectCards] = useState<IProjectCard[]>();

  useEffect(() => {
    getAllProjectCardData()
      .then((pcd) => setProjectCards(pcd.projectCards))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className=" flex flex-col w-full">
      <h1 className=" font-bold text-tertiary-text m-7"> Home Page</h1>
      <section className=" flex flex-col w-full items-center">
        {projectCards?.map((p) => (
          <ProjectCard key={p.id} {...p}></ProjectCard>
        ))}
      </section>
    </div>
  );
}
