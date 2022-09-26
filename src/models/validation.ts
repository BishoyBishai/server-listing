export enum ValidationType {
  "REQUIRED",
  "MIN_LENGTH",
}

export interface Validation {
  type: ValidationType;
  message: string;
  regex?: RegExp;
  minLength?: number;
}
