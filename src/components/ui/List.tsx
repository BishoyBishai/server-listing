import { Fragment, useCallback, useReducer, useEffect } from "react";
import { OrderDirection } from "../../models/general";
import sortList from "../../utils/sort";
import { capitalizeFirstLetter } from "../../utils/text";
import Dropdown from "./Dropdown";
import translation from "./../../localize/en.json";
import { Arrow } from "./icons";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";

interface ListOwnProps<T extends object>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  renderComponent: (props: { data: T }) => React.ReactNode;
  optionContainerClassNames?: string;
  optionClassNames?: string;
  orderKeys?: (keyof T)[];
  indexBy?: keyof T;
  lazyList?: boolean;
  displayOptionLimit?: number;
}

interface ListProps {
  lazyList?: false;
}

interface LazyListProps {
  lazyList: true;
  displayOptionLimit: number;
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
  optionClassNames,
  lazyList,
  ...props
}: ListOwnProps<T> & (ListProps | LazyListProps)) {
  const listReducer = createListReducer<T>();
  const [state, dispatch] = useReducer(listReducer, {
    orderDirection: "asc",
    orderBy: null,
    displayData: data,
  });
  const { ref, displayedData, reCalculatedData } = useInfiniteScrolling({
    data: state.displayData,
    displayLimit: lazyList
      ? (props.displayOptionLimit as number)
      : state.displayData.length,
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

  useEffect(() => {
    reCalculatedData(state.displayData);
  }, [reCalculatedData, state]);

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
            <div
              ref={displayedData.length !== i + 1 ? ref : null}
              className={optionClassNames}
              key={key}
            >
              {renderComponent({
                data: s,
              })}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default List;
