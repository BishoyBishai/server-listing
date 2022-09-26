import { useMemo, useState } from "react";
import { InputValue } from "../models/form";
import { Validation } from "../models/validation";
import { validate } from "../utils/validations";
interface FormElement {
  validations?: Validation[];
  value: InputValue;
}
export type FormElements<T extends string> = {
  [name in T]: FormElement;
};

export default function useForm<T extends string>(props: FormElements<T>) {
  const [formData, setFormData] = useState<{
    [key in T]: InputValue;
  }>(
    Object.keys(props).reduce(
      (data, name) => ({ ...data, [name]: props[name as T].value }),
      {} as {
        [key in T]: InputValue;
      }
    )
  );

  const formErrors: {
    [key in T]: string | undefined;
  } = useMemo(
    () =>
      Object.keys(formData).reduce(
        (errs, e) => {
          const errormessage = validate(
            formData[e as T],
            props[e as T].validations || []
          )?.find((c) => !!c);
          return { ...errs, [e]: errormessage };
        },

        {} as {
          [key in T]: string | undefined;
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData]
  );

  const isValid = useMemo(
    () =>
      Object.keys(formErrors).every((e) => {
        return !formErrors[e as T];
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formErrors]
  );

  return { formData, setFormData, formErrors, isValid };
}
