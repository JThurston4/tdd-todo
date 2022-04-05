import { fireEvent, getNodeText, render, screen } from '@testing-library/react';
import Counter from './index';

describe("counter", () => {
  it("should render without issue", () => {
    render(<Counter />)
  })

  test("renders counter text", () => {
    render(<Counter />)
    const counter = screen.getByTestId('counter');
    expect(getNodeText(counter)).toBe("0")
  })

  test("renders add button", () => {
    render(<Counter />);
    expect(screen.getByTestId('add-btn')).toBeTruthy();
  })

  test(`the counter increases when clicking the add button`, () => {
    render(<Counter />)

    fireEvent.click(screen.getByTestId('add-btn'));

    expect(getNodeText(screen.getByTestId('counter'))).toBe('1')
  })

  it(`should contain a button that will decrement the counter value when clicked`, () => {
    render(<Counter />);

    fireEvent.click(screen.getByText(`Subtract`));

    expect(getNodeText(screen.getByTestId('counter'))).toBe(`-1`)
  })

  it(`should be able to Add and Subtract to the counter value`, () => {
    render(<Counter />);

    fireEvent.click(screen.getByTestId('add-btn'));
    fireEvent.click(screen.getByTestId('add-btn'));
    fireEvent.click(screen.getByTestId('add-btn'));
    fireEvent.click(screen.getByText(`Subtract`));

    expect(getNodeText(screen.getByTestId('counter'))).toBe('2');
  })
});
