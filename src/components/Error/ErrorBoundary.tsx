import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

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
      return <h1>Sorry.. there was an error</h1>;
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
