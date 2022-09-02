import axios, { AxiosError } from 'axios';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}
const instance = axios.create();

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };

    this.handelError = this.handelError.bind(this);
  }
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  handelError(error: AxiosError | Error) {
    this.setState({ hasError: true });
    return Promise.reject(error);
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.log('Uncaught error:', error, errorInfo);
  }

  public componentDidUpdate() {
    instance.interceptors.response.use(
      function (response) {
        console.log('mouheeeeb intercept');
        // Do something with response data
        return response;
      },
      (error) => this.handelError(error)
    );
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
