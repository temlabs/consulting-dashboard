import { useEffect, useReducer } from "react";
import { getAllProjectCardData } from "../functions/requests";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import {
  isSearchTextInProjectName,
  isProjectInDateRange,
} from "../functions/filtering";
import { sortingTypes } from "../functions/sorting";
import KPICard from "./KPICard";
import {
  sumProjectCardContractSize,
  sumProjectCardDays,
} from "../functions/aggregating";
import { formatProjectSize } from "../functions/formatting";
import {
  initialiseHomePage,
  homePageReducer,
  saveFiltersToSessionStorage,
  filterAndSortProjectCards,
} from "../functions/Page Specific/homepagefunctions";
import { IHomePageState } from "../utils/interfaces";
import { alertError } from "../functions/errorhandling";

export default function HomePage(): JSX.Element {
  const preInitialHomePage: IHomePageState = {
    projectCards: [],
    clients: [],
    employees: [],
    filterPreds: [],
    searchText: "",
    searchTextPredicate: isSearchTextInProjectName,
    dateRange: undefined,
    dateRangePredicate: isProjectInDateRange,
    filteredClients: [],
    filteredEmployees: [],
    sort: sortingTypes[0],
  };
  const [state, dispatch] = useReducer(
    homePageReducer,
    preInitialHomePage,
    initialiseHomePage
  );

  useEffect(() => {
    getAllProjectCardData()
      .then((pcd) => dispatch({ type: "setData", data: pcd }))
      .catch((e) => alertError(e));
  }, []);

  useEffect(() => {
    saveFiltersToSessionStorage(state);
  }, [state]);

  const projectCardsOnDisplay = filterAndSortProjectCards(state);

  // FORMAT TEXT STRINGS
  const numberOfProjectsShowing = `${projectCardsOnDisplay.length} projects showing of ${state.projectCards.length}`;
  const totalRevenueFromProjectsShowing = formatProjectSize(
    sumProjectCardContractSize(projectCardsOnDisplay).toString()
  );
  const revenueDescription = "Total revenue generated in date range";

  const numberOfWorkingDays = sumProjectCardDays(projectCardsOnDisplay);
  const numberOfWorkingDaysDescription =
    "Total days spent on projects in date range";

  return (
    <div className=" flex flex-col w-10/12 justify-start items-center">
      <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
        Home Page
      </h1>
      <section className=" flex flex-row w-10/12 items-center justify-start my-16">
        <KPICard
          mainFigure={totalRevenueFromProjectsShowing}
          description={revenueDescription}
        />
        <KPICard
          mainFigure={numberOfWorkingDays.toString()}
          description={numberOfWorkingDaysDescription}
        />
      </section>

      <section className=" flex flex-col w-full items-center">
        <FilterBar state={state} dispatch={dispatch}>
          {numberOfProjectsShowing}
        </FilterBar>

        {projectCardsOnDisplay.map((p) => (
          <ProjectCard key={p.id} {...p}></ProjectCard>
        ))}
      </section>
    </div>
  );
}
