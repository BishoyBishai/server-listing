export type ValidationType = "REQUIRED" | "MIN_LENGTH" | "MATCH";

export interface BasicValidation {
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

export type Validation = BasicValidation &
  (RequiredValidation | MinValidation | MatchValidation);
