import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(): JSX.Element {
  const links = [
    {
      to: "/",
      displayName: "Home",
    },
    {
      to: "/clients",
      displayName: "Clients",
    },
    {
      to: "/employees",
      displayName: "Employees",
    },
  ];

  return (
    <div className=" flex flex-col px-5 py-9 bg-primary-deep text-white font-inter font-bold w-60 h-screen top-0 sticky">
      {links.map((l) => (
        <Link
          key={l.displayName}
          className=" my-2 text-white hover:text-white hover:underline text-xl"
          to={l.to}
        >
          {l.displayName}
        </Link>
      ))}
    </div>
  );
}
