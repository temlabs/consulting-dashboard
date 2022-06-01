import { HomePage } from "./HomePage"
import { Dispatch } from "../utils/types"

interface FilterBarProps {
    state: HomePage;
    dispatch: Dispatch;
}

export default function FilterBar({ state, dispatch }: FilterBarProps): JSX.Element {



    return (
        <div className="flex flex-row justify-start">
            <input className="mx-8 rounded-md border-primary-light border-2" value={state.searchText} onChange={(e) => dispatch({ type: 'setSearchText', newSearchText: e.target.value })} />
        </div>
    )

}