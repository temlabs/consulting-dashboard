import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(): JSX.Element {
  const links = [
    {
      to: "/",
      displayName: "Home",
    },
    {
      to: "/Clients",
      displayName: "Clients",
    },
    {
      to: "/Employees",
      displayName: "Employees",
    },
  ];

  return (
    <div className="flex flex-col px-5 py-9 bg-primary-deep text-white font-inter font-bold w-60">
      {links.map((l) => (
        <Link key={l.displayName} className=" my-2" to={l.to}>
          {l.displayName}
        </Link>
      ))}
    </div>
  );
}
