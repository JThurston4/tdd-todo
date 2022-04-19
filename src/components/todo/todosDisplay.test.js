import React from 'react';
import {render, screen} from '../../test-utils/render';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import TodoDisplay from './todosDisplay';


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

describe("todos display", () => {
  it(`should show no todos if todo list is empty`, () => {
    render(<TodoDisplay />);

    expect(screen.getByTestId('todo-list')).toHaveTextContent(`No Todos...`);
  });
});

//   it(`displays error message when fetching todos is unsuccessful`, async () => {
//     server.use(
//       rest.get('/api/todos', (req, res, ctx) => {
//         return res(
//           ctx.status(500),
//           ctx.json({message: `Internal server error`})
//         );
//       })
//     );

//     render(<TodoDisplay />)

//     expect(await screen.findByText(`Failed to fetch todos`)).toBeInTheDocument();
//     expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
// });
