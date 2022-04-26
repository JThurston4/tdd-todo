import reducer, { todoAdded, todoDeleted, todoStatusChanged } from './todos'

describe(`todos reducer`, () => {

  const initialState = {todos: [
    {
      description: 'Run the tests',
      completed: true,
      id: 0
    },
    {
      description: 'Use Redux',
      completed: false,
      id: 1
    }
  ]};

  test('should return the initial state', () => {
    expect(reducer(undefined, {}).todos).toEqual([])
  })

  test('should handle a todo being added to an empty list', () => {
    const previousState = {todos: []}
    expect(reducer(previousState, todoAdded({description: 'Run the tests', completed: false, id: 0})).todos).toEqual([
      {
        description: 'Run the tests',
        completed: false,
        id: 0
      }
    ])
  })

  test('should handle a todo being added to an existing list', () => {
    const previousState = {todos: [
      {
        description: 'Run the tests',
        completed: true,
        id: 0
      }
    ]}
    expect(reducer(previousState, todoAdded({description: 'Use Redux', completed: false, id: 1})).todos).toEqual(initialState.todos)
  });

  it(`should be able to change a todo's completion status`, () => {
    expect(reducer(initialState, todoStatusChanged({id: 0, completed: false})).todos).toEqual([
      {
        description: 'Run the tests', 
        completed: false,
        id: 0
      },
      {
        description: 'Use Redux',
        completed: false,
        id: 1
      }
    ])
  });

  it(`should be able to delete a todo`, () => {
    expect(reducer(initialState, todoDeleted(0)).todos).toEqual([
      {
        description: 'Use Redux',
        completed: false,
        id: 1
      }
    ])
  })
})
