import React from 'react';
import {render, fireEvent, screen, within} from '../../test-utils/render';
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Todo from './index';

// #region for api mocking
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
//#endregion


describe("todo", () => {
  it("should render without issue", () => {
    render(<Todo />)
  });


  it('should add a todo to the todo list when text field is filled and btn is clicked', async () => {
    render(<Todo />);
    const textbox = screen.getByRole('textbox');
  
    await userEvent.type(textbox, 'Hello');
    fireEvent.click(screen.getByTestId('todo-add-btn'));
    
    const todos = screen.getAllByTestId('todo-item');
    expect(todos[0]).toHaveTextContent('Hello');
    expect(within(todos[0]).getByRole('checkbox')).toHaveProperty('checked', false);

    fireEvent.click(within(todos[0]).getByRole('checkbox'));
    expect(within(todos[0]).getByRole('checkbox')).toHaveProperty('checked', true);
  
  });

  // it(`should allow the user to click the checkbox and change the checkbox value`, async () => {
  //   render(<Todo />);

  //   const todos = await screen.findAllByTestId('todo-item');
  
  //   fireEvent.click(within(todos[0]).getByRole('checkbox'));
  //   expect(within(todos[0]).getByRole('checkbox')).toHaveProperty('checked', true);

  // })
});
