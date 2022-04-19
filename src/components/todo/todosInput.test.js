import React from 'react';
import {render, screen, fireEvent} from '../../test-utils/render';
import userEvent from '@testing-library/user-event'
import TodoInputs from './todosInput';

describe(`todo inputs`, () => {

  describe("text field", () => {

    it("should exist", () => {
      render(<TodoInputs />);
      
      expect(screen.getByTestId('todo-text-input')).toBeTruthy();
    });
    
    it("should allow typing", async () => {
      render(<TodoInputs />)
      const textbox = screen.getByRole('textbox');
      await userEvent.type(textbox, 'Hello')
      expect(textbox).toHaveValue('Hello')
    });
  });

  it('should clear after todo is submit', async () => {
    render(<TodoInputs />)
    const textbox = screen.getByRole('textbox');

    await userEvent.type(textbox, 'Hello')
    fireEvent.click(screen.getByTestId('todo-add-btn'));
    
    expect(textbox).toHaveValue('')
  })

  describe("add button", ()=> {
    it("should exist", () => {
      render(<TodoInputs />);

      expect(screen.getByTestId('todo-add-btn')).toBeTruthy();
    });

    
  });
})
