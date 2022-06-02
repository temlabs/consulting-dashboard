import { IHomePage } from "./HomePage";
import { Dispatch } from "../utils/types";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { sortingTypes } from "../functions/sorting";

interface FilterBarProps {
  state: IHomePage;
  dispatch: Dispatch;
  children: string;
}

export default function FilterBar({
  state,
  dispatch,
  children,
}: FilterBarProps): JSX.Element {
  function updateDateRange(
    values: RangeValue<Moment>,
    formatstring: [string, string]
  ): void {
    if (values !== undefined && values !== null && values[0] && values[1]) {
      dispatch({ type: "setDateRange", newDateRange: values });
    } else {
      dispatch({ type: "setDateRange", newDateRange: undefined });
    }
  }

  function updateSortPredicate(displayName: string) {
    const sort = sortingTypes.find((st) => st.displayName === displayName);
    if (sort) {
      dispatch({ type: "setSort", newSort: sort });
    }
  }

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row justify-start bg-white w-10/12 h-24 mb-4 rounded-lg items-baseline">
          <input
            className=" outline-none mx-8 rounded-md border-primary-light h-6 w-80 mt-5 border-2"
            value={state.searchText}
            onChange={(e) =>
              dispatch({ type: "setSearchText", newSearchText: e.target.value })
            }
          />
          <div>
            <DatePicker.RangePicker
              picker="date"
              allowClear={true}
              onChange={updateDateRange}
              placement="bottomRight"
              className="h-6"
              style={{
                border: "solid",
                borderRadius: "0.375rem",
                borderColor: "rgb(140, 165, 177)",
                borderWidth: "2px",
                fontFamily: "Inter",
              }}
              ranges={{
                Today: [moment(), moment()],
                "Last 7 Days": [moment().subtract(7, "days"), moment()],
                "Last Month": [
                  moment().subtract(1, "month").startOf("month"),
                  moment().subtract(1, "month").endOf("month"),
                ],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-start w-10/12">
          <select
            value={state.sort.displayName}
            onChange={(e) => updateSortPredicate(e.target.value)}
          >
            {sortingTypes.map((st) => (
              <option key={st.displayName}> {st.displayName}</option>
            ))}
          </select>
        </div>
        <p className="mb-4">{children}</p>
      </div>
    </>
  );
}
