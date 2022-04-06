import React from 'react';
import { fireEvent, getNodeText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Todo from './index';

describe("todo", () => {
  it("should render without issue", () => {
    render(<Todo />)
  });

  describe("text field", () => {

    it("should exist", () => {
      render(<Todo />);
      
      expect(screen.getByTestId('todo-text-input')).toBeTruthy();
    });
    
    it("should allow typing", async () => {
      render(<Todo />)

      await userEvent.type(screen.getByRole('textbox'), 'Hello')
      expect(screen.getByRole('textbox')).toHaveValue('Hello')
    });
  });

  describe("add button", ()=> {
    it("should exist", () => {
      render(<Todo />);

      expect(screen.getByTestId('todo-add-btn')).toBeTruthy();
    });

    it('should add a todo to the todo list when text field is filled and btn is clicked', async () => {
      render(<Todo />);
      const todos = screen.getAllByTestId('todo-item');

      await userEvent.type(screen.getByRole('textbox'), 'Hello')
      fireEvent.click(screen.getByTestId('todo-add-btn'));

      expect(todos[0].toBe('Hello'))

    });
  });

  describe(`todo list`, () => {
    it(`should exist`, () => {
      render(<Todo />);

      const todos = screen.getByTestId('todo-list');
      expect(todos).toBeTruthy();
    })
  })
});
