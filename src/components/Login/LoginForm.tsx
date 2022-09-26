import React, { useCallback } from "react";
import useForm from "../../hooks/useForm";
import { ValidationType } from "../../models/validation";
import Input from "../ui/Input";
import Logo from "./../../assets/images/logo.png";
import translation from "./../../localize/en.json";

export default function LoginForm() {
  const { formData, formErrors, setFormData, isValid } = useForm<
    "username" | "password"
  >({
    username: {
      validations: [
        {
          type: ValidationType.REQUIRED,
          message: translation.login.username.required,
        },
      ],
      value: "",
    },
    password: {
      validations: [
        {
          type: ValidationType.REQUIRED,
          message: translation.login.password.required,
        },
        {
          type: ValidationType.MIN_LENGTH,
          minLength: 8,
          message: translation.login.password.passwordLength,
        },
      ],
      value: "",
    },
  });

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData, setFormData]
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container flex h-full items-baseline md:items-center">
        <div className="flex items-center justify-center flex-col sm:flex-row container px-6 py-12">
          <div className="w-4/12 md:w-3/12">
            <input type="image" src={Logo} className="w-full" alt="Logo" />
          </div>
          <div className="w-7/12 md:w-5/12 mb-8">
            <div className="w-full mb-8">
              <Input
                name="username"
                label={translation.login.username.label}
                placeholder={translation.login.username.placeholder}
                value={formData.username}
                onBlur={handleInputBlur}
                error={formErrors.username}
              />
            </div>
            <div className="w-full mb-8">
              <Input
                name="password"
                label={translation.login.password.label}
                placeholder={translation.login.password.placeholder}
                type="password"
                value={formData.password}
                onBlur={handleInputBlur}
                error={formErrors.password}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="inline-block px-7 py-3 bg-nord-layer-500 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-nord-layer-700 hover:shadow-lg focus:bg-nord-layer-700 disabled:bg-gray-500 disabled:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-nord-layer-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {translation.login.signInCTA}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
