import { InputHTMLAttributes } from "react";

export type InputValue = string | number | readonly string[] | undefined;

export type FormElementsData = {
  [key: string]: InputValue;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}
