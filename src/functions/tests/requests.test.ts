import { getProjects } from "../requests";

test("getProjects returns a promise for the full list of client projects", () => {
  expect(getProjects()).toBe("");
});
