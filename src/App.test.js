import { render } from '@testing-library/react';
import App from './App';

describe("app", () => {
  it("should render without issue", () => {
    render(<App />)
  })

});
