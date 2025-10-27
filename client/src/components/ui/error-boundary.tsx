import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="bg-almost-black border-gray-700 max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
              <p className="text-gray-400">
                We encountered an unexpected error. Don't worry, your progress has been saved.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left w-full">
                  <summary className="text-sm text-gray-500 cursor-pointer">Error details</summary>
                  <pre className="mt-2 text-xs text-red-400 overflow-auto p-2 bg-gray-900 rounded">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <div className="flex gap-3 mt-4">
                <Button onClick={this.handleReset} className="bg-lfc-red hover:bg-bright-red">
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}