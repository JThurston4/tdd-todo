import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Todo from './index';

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
      const textbox = screen.getByRole('textbox');
      await userEvent.type(textbox, 'Hello')
      expect(textbox).toHaveValue('Hello')
    });
  });

  it('should clear after todo is submit', async () => {
    render(<Todo />)
    const textbox = screen.getByRole('textbox');

    await userEvent.type(textbox, 'Hello')
    fireEvent.click(screen.getByTestId('todo-add-btn'));
    
    expect(textbox).toHaveValue('')
  })

  describe("add button", ()=> {
    it("should exist", () => {
      render(<Todo />);

      expect(screen.getByTestId('todo-add-btn')).toBeTruthy();
    });

    it('should add a todo to the todo list when text field is filled and btn is clicked', async () => {
      render(<Todo />);
      const textbox = screen.getByRole('textbox');

      await userEvent.type(textbox, 'Hello');
      fireEvent.click(screen.getByTestId('todo-add-btn'));
      
      const todos = screen.getAllByTestId('todo-item');
      expect(todos[4]).toHaveTextContent('Hello');

    });
  });

  describe(`todo list`, () => {
    it(`should exist`, () => {
      render(<Todo />);

      const todos = screen.getByTestId('todo-list');
      expect(todos).toBeTruthy();
    });

    it('should have a checkbox showing if todo is completed', async () => {
      render(<Todo />);

      const todos = await screen.findAllByTestId('todo-item');
      expect(todos).toHaveLength(4);
      expect(within(todos[0]).getByRole('checkbox')).toHaveProperty('checked', false);
      expect(within(todos[1]).getByRole('checkbox')).toHaveProperty('checked', true);
      expect(within(todos[2]).getByRole('checkbox')).toHaveProperty('checked', true);
      expect(within(todos[3]).getByRole('checkbox')).toHaveProperty('checked', false);
    });

    it(`should display a description for each checkbox`, async () => {
      render(<Todo />);

      const todos = await screen.findAllByTestId('todo-item');
      
      expect(todos[0]).toHaveTextContent(`the first todo`);
      expect(todos[1]).toHaveTextContent(`numbah 2`)
      expect(todos[2]).toHaveTextContent(`third times the charm`)
      expect(todos[3]).toHaveTextContent(`four score`)
    });

    it(`should allow the user to click the checkbox and change the checkbox value`, async () => {
      render(<Todo />);

      const todos = await screen.findAllByTestId('todo-item');
    
      fireEvent.click(within(todos[0]).getByRole('checkbox'));
      expect(within(todos[0]).getByRole('checkbox')).toHaveProperty('checked', true);

    })
  });

  it(`displays error message when fetching todos is unsuccessful`, async () => {
    server.use(
      rest.get('/api/todos', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({message: `Internal server error`})
        );
      })
    );

    render(<Todo />)

    expect(await screen.findByText(`Failed to fetch todos`)).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  })
});
