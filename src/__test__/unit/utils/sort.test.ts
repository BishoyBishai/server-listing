import sortList from "../../../utils/sort";

let list: {
  distance: number;
  name: string;
}[];

beforeEach(() => {
  list = [
    {
      distance: 1,
      name: "a",
    },
    {
      distance: 2,
      name: "z",
    },
  ];
});
describe("Sort List", () => {
  it("Names should be returned in alphabetical order if you sort by name ascending.", () => {
    expect(sortList(list, "name", "asc")[0].name).toBe("a");
  });
  it("Names should be returned in alphabetical descending order if you sort by name descending.", () => {
    expect(sortList(list, "name", "desc")[0].name).toBe("z");
  });
  it("Distance should be returned in numeric order if you sort by distance ascending.", () => {
    expect(sortList(list, "distance", "asc")[0].distance).toBe(1);
  });
  it("Distance should be returned in alphabetical descending order if you sort by distance descending.", () => {
    expect(sortList(list, "distance", "desc")[0].distance).toBe(2);
  });
});
