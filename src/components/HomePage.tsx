import { useEffect, useReducer, useState } from "react";
import { getAllProjectCardData } from "../functions/requests";
import { Client, Employee, IProjectCard, IProjectCardPredicate, ProjectComposite } from "../utils/interfaces";
import { Action } from "../utils/types";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import { testPredicates, isSearchTextInProjectName } from "../functions/filtering";


export interface HomePage {
    projectCards: IProjectCard[];
    clients: Client[];
    employees: Employee[];
    filterPreds: IProjectCardPredicate[];
    searchText: string;
}







function reducer(state: HomePage, action: Action): HomePage {
    switch (action.type) {
        case 'addFilter': return { ...state, filterPreds: [...state.filterPreds, action.filterPredToAdd] }
        case 'removeFilter': return { ...state, filterPreds: state.filterPreds.filter(fp => fp !== action.filterPredToRemove) }
        case 'setData': return { ...state, projectCards: action.data.projectCards, clients: action.data.clients, employees: action.data.employees }
        case 'setSearchText': return { ...state, searchText: action.newSearchText }
        default: return state
    }
}





export default function HomePage(): JSX.Element {

    const emptyHomePage = {
        projectCards: [],
        clients: [],
        employees: [],
        filterPreds: [],
        searchText: ''
    }
    const [state, dispatch] = useReducer(reducer, emptyHomePage)


    useEffect(() => {
        getAllProjectCardData()
            .then((pcd) => dispatch({ type: 'setData', data: pcd }))
            .catch((e) => console.log(e));
        const initialFilter: IProjectCardPredicate = {
            id: 'first',
            func: isSearchTextInProjectName
        }
        dispatch({ type: 'addFilter', filterPredToAdd: initialFilter })
    }, []);


    const projectCardsOnDisplay = state.projectCards.filter(p => testPredicates(p, state))



    return (
        <div className=" flex flex-col w-full">

            <h1 className=" font-bold text-2xl text-tertiary-text m-7 ml-20 opacity-40">
                {" "}
                Home Page
            </h1>


            <section className=" flex flex-col w-full items-center">
                <FilterBar state={state} dispatch={dispatch} />

                <p>{`${projectCardsOnDisplay.length} projects showing of ${state.projectCards.length}`}</p>

                {projectCardsOnDisplay.map((p) => (
                    <ProjectCard key={p.id} {...p}></ProjectCard>
                ))}
            </section>


        </div>
    );
}
