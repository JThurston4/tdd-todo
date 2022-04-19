import React from 'react';
// import { fireEvent, render, screen, within } from '@testing-library/react';
import {render, fireEvent, screen, within} from '../../test-utils/render';
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Todo from './index';
import TodoInputs from './todosInput';

import { Provider } from 'react-redux'
import { configureStore } from 'redux-mock-store';


const allTodos = [
  {description: 'the first todo', completed: false},
  {description: 'numbah 2', completed: true},
  {description: 'third times the charm', completed: true},
  {description: 'four score', completed: false}
 ];

const server = setupServer(
  rest.get('/api/todos', (req, res, ctx) => {
    return res(ctx.json({todos: allTodos}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe(`todo inputs`, () => {

  // describe("text field", () => {

  //   it("should exist", () => {
  //     render(<TodoInputs />);
      
  //     expect(screen.getByTestId('todo-text-input')).toBeTruthy();
  //   });
    
  //   it("should allow typing", async () => {
  //     render(<TodoInputs />)
  //     const textbox = screen.getByRole('textbox');
  //     await userEvent.type(textbox, 'Hello')
  //     expect(textbox).toHaveValue('Hello')
  //   });
  // });

  // it('should clear after todo is submit', async () => {
  //   render(<TodoInputs />)
  //   const textbox = screen.getByRole('textbox');

  //   await userEvent.type(textbox, 'Hello')
  //   fireEvent.click(screen.getByTestId('todo-add-btn'));
    
  //   expect(textbox).toHaveValue('')
  // })

  describe("add button", ()=> {
    it("should exist", () => {
      render(<TodoInputs />);

      expect(screen.getByTestId('todo-add-btn')).toBeTruthy();
    });

    
  });
})
