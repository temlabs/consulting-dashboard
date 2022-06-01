import { HomePage } from "../components/HomePage"
import { IProjectCard, IProjectCardPredicate } from "../utils/interfaces"

export function testPredicates(project: IProjectCard, state: HomePage) {
    const test = state.filterPreds.every(pred => pred.func(project, state))
    return test
}

export function isSearchTextInProjectName(p: IProjectCard, state: HomePage): boolean {
    const result = p.projectName.includes(state.searchText)
    console.log(result)
    return result
}