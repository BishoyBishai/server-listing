import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorComponent = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Something went wrong; we are investigating it
          </p>
        </div>
      </div>
    </section>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

const withErrorBoundaryCheck = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithErrorBoundaryCheck extends React.Component<P> {
    render() {
      return (
        <ErrorBoundary>
          <Component {...(this.props as P)} />
        </ErrorBoundary>
      );
    }
  };

export default withErrorBoundaryCheck;
