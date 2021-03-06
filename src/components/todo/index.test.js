import React from 'react';
import {render, fireEvent, screen, within, waitFor} from '../../test-utils/render';
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


  it(`should remove a todo when clicking the delete button`, async () => {
    render(<Todo />);
    const textbox = screen.getByRole('textbox');
  
    await userEvent.type(textbox, 'Hello');
    fireEvent.click(screen.getByTestId('todo-add-btn'));
    await userEvent.type(textbox, 'todo 2');
    fireEvent.click(screen.getByTestId('todo-add-btn'));
    await userEvent.type(textbox, 'three three tee hee');
    fireEvent.click(screen.getByTestId('todo-add-btn'));

    const todos = screen.getAllByTestId('todo-item');
    expect(todos.length).toEqual(3);
    expect(todos[0]).toHaveTextContent('Hello');

    fireEvent.click(within(todos[0]).getByRole('button'));
    const newTodos = screen.getAllByTestId('todo-item');
    
    await waitFor(() => {
      expect(newTodos.length).toEqual(2);
    })
    expect(newTodos[0]).toHaveTextContent('todo 2');
    expect(newTodos[1]).toHaveTextContent('three three tee hee');
    expect(newTodos[2]).toBeFalsy();
    
  })
});
