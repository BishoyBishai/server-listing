import React, { useState, useCallback } from "react";
import { RenderResult, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme, ThemeContext } from "../../contexts/themeContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export async function inputData(
  subject: RenderResult,
  inputName: string,
  value: string
): Promise<void> {
  const element = subject.getByDisplayValue(
    (_, element) => element?.getAttribute("name") === inputName
  );

  await userEvent.clear(element);
  value && (await userEvent.type(element, value || ""));
  await fireEvent.blur(element);
}

export async function handleSubmit(
  subject: RenderResult,
  target: string
): Promise<void> {
  await userEvent.click(subject.getByText(target));
}

export function MockedWrapper({
  children,
  mockTheme = "light",
}: {
  children: React.ReactNode;
  mockTheme?: Theme;
}): JSX.Element {
  const [theme, setTheme] = useState<Theme>(mockTheme);

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: handleChangeTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
