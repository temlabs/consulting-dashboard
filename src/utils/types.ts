import { IProjectCardPredicate, ProjectComposite } from "./interfaces"

export type Action =
    { type: 'addFilter', filterPredToAdd: IProjectCardPredicate }
    | { type: 'removeFilter', filterPredToRemove: IProjectCardPredicate } | { type: 'setData', data: ProjectComposite } | { type: 'setSearchText', newSearchText: string }


export type Dispatch = (action: Action) => void