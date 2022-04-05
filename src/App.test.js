import { fireEvent, getNodeText, render, screen } from '@testing-library/react';
import App from './App';

describe("app", () => {
  it("should render without issue", () => {
    render(<App />)
  })

  

  
  // test('renders learn react link', () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // })
});
