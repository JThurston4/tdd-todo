// import { render } from '@testing-library/react';
import { render } from './test-utils/render';
import App from './App';

describe("app", () => {
  it("app should render without issue", () => {
    render(<App />)
  })

});
