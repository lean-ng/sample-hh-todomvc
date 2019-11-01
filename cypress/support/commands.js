Cypress.Commands.add('createTodo', (todo) => {
  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps () {
      return {
        'Inserted Todo': todo
      }
    }
  })

  // create the todo
  cy
    .get('.new-todo', { log: false })
    .type(`${todo}{enter}`, { log: false })

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy
    .get('.todo-list', { log: false })
    .contains('li', todo.trim(), { log: false })
    .then(($li) => {
      // set the $el for the command so
      // it highlights when we hover over
      // our command
      cmd.set({ $el: $li }).snapshot().end()
    })
})
