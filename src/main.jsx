import React from "react";
import ReactDOM from "react-dom/client";
import PropertyManagementSystem from "./PropertyManagementSystem.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Gatehouse crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          height: "100vh", fontFamily: "sans-serif", gap: "12px", padding: "24px", textAlign: "center",
        }}>
          <div style={{ fontSize: "18px", fontWeight: 600 }}>Something went wrong.</div>
          <div style={{ fontSize: "14px", color: "#68708A" }}>Try reloading the page. If this keeps happening, check the browser console for details.</div>
          <button
            onClick={() => window.location.reload()}
            style={{ background: "#B08A3E", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PropertyManagementSystem />
    </ErrorBoundary>
  </React.StrictMode>
);
