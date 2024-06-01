import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHkwMmNpNjZiaHBrdW8yZzJnOHB6ZzI1ZjltcmhxdGF5ZHZzMWt0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.webp"
              alt="Funny cat"
              className="mx-auto h-[200px] mb-4"
            />
            <h1 className="text-3xl font-semibold text-red-600 mb-4">
              Oops, Something went wrong!
            </h1>
            <p className="text-gray-700 mb-4">
              It's not you, it's us. Even the best of us have bad days.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Try again, after a coffee break
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
