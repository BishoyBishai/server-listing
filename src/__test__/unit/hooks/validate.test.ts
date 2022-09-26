import { ValidationType } from "../../../models/validation";
import { validate } from "../../../utils/validations";

describe("validation", () => {
  describe("Test require", () => {
    it("Without validation, validation always returns true.", () => {
      expect(validate("", []).length).toBe(0);
    });

    it("If the required value is an empty array, a validation message must be returned.", () => {
      expect(
        validate("", [
          { type: ValidationType.REQUIRED, message: "required" },
        ])[0]
      ).toBe("required");
    });

    it("If the required value is just spaces, a validation message must be returned.", () => {
      expect(
        validate("           ", [
          { type: ValidationType.REQUIRED, message: "required" },
        ])[0]
      ).toBe("required");
    });

    it("If the required value is number 0, must returns empty array", () => {
      expect(
        validate(111, [{ type: ValidationType.REQUIRED, message: "required" }])
          .length
      ).toBe(0);
    });

    it("If the required value is string, must returns empty array", () => {
      expect(
        validate("test", [
          { type: ValidationType.REQUIRED, message: "required" },
        ]).length
      ).toBe(0);
    });
  });

  describe("Test min length", () => {
    it("If the required value is an empty string, a validation message must be returned.", () => {
      expect(
        validate("", [
          {
            type: ValidationType.MIN_LENGTH,
            minLength: 8,
            message: "at least 8 letters",
          },
        ])[0]
      ).toBe("at least 8 letters");
    });

    it("If the required value is an more than 8 letter returns empty array.", () => {
      expect(
        validate("testing1234", [
          {
            type: ValidationType.MIN_LENGTH,
            minLength: 8,
            message: "at least 8 letters",
          },
        ]).length
      ).toBe(0);
    });
    it("send two error messages in two cases where the checks fail", () => {
      expect(
        validate("", [
          {
            type: ValidationType.REQUIRED,
            message: "required",
          },
          {
            type: ValidationType.MIN_LENGTH,
            minLength: 8,
            message: "at least 8 letters",
          },
        ]).length
      ).toBe(2);
    });
  });
});
