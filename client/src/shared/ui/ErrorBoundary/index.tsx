import React from "react";

interface Props {
    children?: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_error: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Uncaught error:", error, info);
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children;
    }
}

export default ErrorBoundary;