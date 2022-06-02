export default function KPICard({
  mainFigure,
  description,
}: {
  mainFigure: string;
  description: string;
}): JSX.Element {
  return (
    <div className="flex flex-col justify-between items-start w-72 rounded-lg bg-white h-36 mr-5">
      <div className=" grow w-full flex justify-center items-center h-3/4">
        <h1 className=" text-4xl font-bold">{mainFigure}</h1>
      </div>
      <h3 className=" flex-grow-0 text-lg font-semibold ml-4">{description}</h3>
    </div>
  );
}
