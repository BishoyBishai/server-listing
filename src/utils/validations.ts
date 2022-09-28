import { InputValue } from "../models/form";
import { Validation } from "../models/validation";

export const validate = (v: InputValue, cases: Validation[]) => {
  return cases
    .map((c) => {
      switch (c.type) {
        case "REQUIRED":
          if (
            typeof v === undefined ||
            (typeof v === "string" && v.trim() === "")
          ) {
            return c.message;
          }
          break;

        case "MIN_LENGTH":
          if (`${v}`.length < (c.minLength as number)) return c.message;
          break;
      }
    })
    .filter((c) => !!c);
};
