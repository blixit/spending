import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({  hasError: true, error });
  }

  render() {
    const { hasError, error } = this.state;
    
    if (hasError) {
      return <h1>Something went wrong: {error.message}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
