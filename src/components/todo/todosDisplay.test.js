import React from 'react';
import {render, screen} from '../../test-utils/render';
import TodoDisplay from './todosDisplay';


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
