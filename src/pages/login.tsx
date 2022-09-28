import withErrorBoundaryCheck from "../components/Error/ErrorBoundary";
import React, { useCallback, useEffect } from "react";
import useForm from "../hooks/useForm";
import { LoginRequestBody, useLogin } from "../hooks/useLogin";
import translation from "./../localize/en.json";
import Input from "../components/Form/Input";
import Loading from "../components/ui/Loading";
import { LogoDark, LogoLight } from "../components/ui/icons";
import { useThemeContext } from "../contexts/themeContext";
import useIsAuth from "../hooks/useIsAuth";

function Login() {
  const { mutate: doLogin, isLoading, isError } = useLogin();
  const isAuth = useIsAuth();
  const { theme } = useThemeContext();

  const { formData, formErrors, setFormData, isValid } = useForm<
    "username" | "password"
  >({
    username: {
      validations: [
        {
          type: "REQUIRED",
          message: translation.login.username.required,
        },
      ],
      value: "",
    },
    password: {
      validations: [
        {
          type: "REQUIRED",
          message: translation.login.password.required,
        },
        {
          type: "MIN_LENGTH",
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

  const handleFromSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return doLogin(formData as LoginRequestBody);
    },
    [doLogin, formData]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isAuth(), []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container flex h-full items-baseline md:items-center">
        <div className="flex items-center justify-center flex-col lg:flex-row container px-6 py-12">
          <div className="flex w-full md:w-3/12 h-20 justify-center md:origin-center sm:scale-150">
            {theme === "light" ? <LogoDark /> : <LogoLight />}
          </div>
          <form
            noValidate
            onSubmit={handleFromSubmit}
            className="w-7/12 md:w-5/12 mb-8"
          >
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
              data-testid="submit-login"
              className="inline-block px-7 py-3 bg-nord-layer-500 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-nord-layer-700 hover:shadow-lg focus:bg-nord-layer-700 disabled:bg-gray-500 disabled:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-nord-layer-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              {!isLoading ? (
                <div className="inline mr-2 w-8 h-8">
                  {translation.login.signInCTA}
                </div>
              ) : (
                <Loading />
              )}
            </button>
            {isError && (
              <div className="my-4 inline-block text-red-500 text-sm italic">
                {translation.login.formError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundaryCheck(Login);
