import { Fragment, useCallback, useReducer } from "react";
import { OrderDirection } from "../../models/general";
import sortList from "../../utils/sort";
import { capitalizeFirstLetter } from "../../utils/text";
import Dropdown from "./Dropdown";
import translation from "./../../localize/en.json";
import { Arrow } from "./icons";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";

interface ListProps<T extends object>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  renderComponent: (props: {
    data: T;
    ref?: (instance: HTMLElement | null) => void;
  }) => React.ReactNode;
  optionContainerClassNames?: string;
  orderKeys?: (keyof T)[];
  indexBy?: keyof T;
}

type BasicListAction = {
  type: "ChangeOrderDirection";
};

type ChangeOrderByAction<T extends object> = {
  type: "ChangeOrderBy";
  payload: keyof T;
};

type ListState<T extends object> = {
  orderBy: keyof T | null;
  orderDirection: OrderDirection;
  displayData: T[];
};

const createListReducer =
  <T extends object>() =>
  (
    state: ListState<T>,
    action: BasicListAction | ChangeOrderByAction<T>
  ): ListState<T> => {
    switch (action.type) {
      case "ChangeOrderBy":
        return {
          ...state,
          orderBy: action.payload,
          orderDirection: "asc",
          displayData: sortList(state.displayData, action.payload, "asc"),
        };
      case "ChangeOrderDirection":
        const newDirection = state.orderDirection === "asc" ? "desc" : "asc";
        return {
          ...state,
          orderDirection: newDirection,
          displayData: sortList(
            state.displayData,
            state.orderBy as keyof T,
            newDirection
          ),
        };
    }
  };

const DropDownOption = ({
  option,
  currentOrder,
  orderDirection,
}: {
  option: string;
  currentOrder: string;
  orderDirection: OrderDirection;
}) => {
  const text = capitalizeFirstLetter(option);
  return (
    <div className="flex items-center justify-center">
      {text}{" "}
      {option === currentOrder && (
        <Arrow className={`${orderDirection === "asc" ? "rotate-180" : ""}`} />
      )}
    </div>
  );
};

function List<T extends object>({
  data,
  indexBy,
  orderKeys,
  renderComponent,
  optionContainerClassNames,
  ...props
}: ListProps<T>) {
  const listReducer = createListReducer<T>();
  const [state, dispatch] = useReducer(listReducer, {
    orderDirection: "asc",
    orderBy: null,
    displayData: data,
  });
  const { ref, displayedData } = useInfiniteScrolling({
    data: state.displayData,
    displayLimit: 10,
  });

  const changeOrderBy = useCallback(
    (by: keyof T) => dispatch({ type: "ChangeOrderBy", payload: by }),
    []
  );

  const changeOrderDirection = useCallback(
    () => dispatch({ type: "ChangeOrderDirection" }),
    []
  );

  const handleOrderChange = useCallback(
    (by: string) => {
      if (by === state.orderBy) {
        return changeOrderDirection();
      }
      changeOrderBy(by as keyof T);
    },
    [changeOrderBy, changeOrderDirection, state.orderBy]
  );

  return (
    <Fragment>
      <div className={`${optionContainerClassNames || ""}`}>
        <Dropdown
          text={
            state.orderBy
              ? `${translation.list.sortBy} ${capitalizeFirstLetter(
                  state.orderBy as string
                )}`
              : `${translation.list.sortBy}`
          }
          onSelect={handleOrderChange}
          options={
            orderKeys
              ? orderKeys.map((k) => ({
                  key: k as string,
                  DisplayText: (
                    <DropDownOption
                      option={k as string}
                      currentOrder={state.orderBy as string}
                      orderDirection={state.orderDirection}
                    />
                  ),
                }))
              : []
          }
        />
      </div>
      <div {...props}>
        {displayedData.map((s, i) => {
          const key = indexBy ? `${s[indexBy]}` : i;
          return (
            <Fragment key={key}>
              {renderComponent({
                ref: displayedData.length === i + 1 ? ref : undefined,
                data: s,
              })}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}

export default List;
