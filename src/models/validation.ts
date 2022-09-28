export type ValidationType = "REQUIRED" | "MIN_LENGTH" | "MATCH";

export interface BasicValidation<E extends ValidationType = ValidationType> {
  type: E;
  message: string;
}

type RequiredValidation = BasicValidation & {
  type: "REQUIRED";
};

type MinValidation = BasicValidation & {
  type: "MIN_LENGTH";
  minLength: number;
};

type MatchValidation = BasicValidation & {
  type: "MATCH";
  regex: RegExp;
};

export type Validation<E extends ValidationType = ValidationType> =
  | (BasicValidation<E> & RequiredValidation)
  | MinValidation
  | MatchValidation;
