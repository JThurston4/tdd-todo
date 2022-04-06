import { fireEvent, getNodeText, render, screen } from '@testing-library/react';
import App from './App';

describe("app", () => {
  it("should render without issue", () => {
    render(<App />)
  })

});
