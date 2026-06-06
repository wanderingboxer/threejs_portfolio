import { Component } from 'react';

// Catches any error inside a 3D Canvas so a context-lost or shader crash
// can never take down the whole React tree.
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    // eslint-disable-next-line no-console
    console.warn('[SceneBoundary] 3D scene errored, hiding:', err?.message || err);
  }
  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SceneBoundary;
