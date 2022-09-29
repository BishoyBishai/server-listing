import { OrderDirection } from "../models/general";

export default function sortList<T extends object>(
  data: T[],
  by: keyof T,
  direction: OrderDirection
) {
  return data.sort(function (a, b) {
    const x = a[by];
    const y = b[by];
    const directionAsNumber = direction === "asc" ? 1 : -1;
    return x < y ? -directionAsNumber : x > y ? directionAsNumber : 0;
  });
}
