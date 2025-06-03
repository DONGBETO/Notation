// components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Met à jour l'état pour afficher l'UI de secours
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // Tu peux aussi logguer l'erreur ici
    console.error("Erreur attrapée par ErrorBoundary :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 p-4 bg-red-100 rounded-md shadow">
          <h2 className="text-xl font-semibold">Une erreur s'est produite.</h2>
          {/* <p className="text-sm">{this.state.errorMessage}</p> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
