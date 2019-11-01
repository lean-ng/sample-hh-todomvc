describe('Angular TodoMVC', () => {

  const todoFixtures = [
    'Unit Testing',
    'E2E Testing',
    'Test Coverage'
  ];

  const selectors = {
    newTodo: '.new-todo',
    todoList: '.todo-list',
    todoItems: '.todo-list li',
    count: 'span.todo-count',
    main: '.main',
    footer: '.footer',
    toggleAll: '.toggle-all',
    clearCompleted: '.clear-completed',
    filters: '.filters',
    filterItems: '.filters li a'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  context.skip('When page is initially opened', () => {
    it('should focus on the todo input field', () => {
      cy.focused().should('have.class', 'new-todo');
    });
  });

  context.skip('No Todos', function () {
    it('starts with nothing', () => {
      cy.get(selectors.todoItems).should('have.length', 0);
    })

    it('should hide main section and footer toolbar', function () {
      cy.get(selectors.main).should('not.be.visible')
      cy.get(selectors.footer).should('not.be.visible')
    })
  });

  context.skip('New Todo', () => {
    it('should allow me to add todo items', () => {
      cy.get(selectors.newTodo).type(`${todoFixtures[0]}{enter}`);
      cy.get(selectors.todoItems).first().contains('label',todoFixtures[0]);
      cy.get(selectors.newTodo).type(`${todoFixtures[1]}{enter}`);
      cy.get(selectors.todoItems).last().contains('label',todoFixtures[1]);
      cy.get(selectors.todoItems).should('have.length', 2);
    });

    it('should clear text input field when an item is added', () => {
      cy.createTodo(todoFixtures[0]);
      cy.get(selectors.newTodo).should('have.text', '')
    });

    it('should trim text input', () => {
      cy.createTodo(`    ${todoFixtures[0]}    `);
      cy
        .get(selectors.todoItems).first()
        .find('label')
        .should('have.text', todoFixtures[0]);
    });

    it('should not allow me to enter empty todos', () => {
      cy.get(selectors.newTodo).type('{enter}');
      cy.get(selectors.newTodo).type('   {enter}');
      cy.get(selectors.todoItems).should('have.length', 0);
    });

    it('should show main section and footer toolbar when items added', () => {
      cy.createTodo(todoFixtures[0]);
      cy.get(selectors.main).should('be.visible')
      cy.get(selectors.footer).should('be.visible')
    });

    it.skip('should persist added items', () => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.get(selectors.todoItems).should('have.length', 3);
      cy.reload();
      cy.get(selectors.todoItems).should('have.length', 3);
    });
  });

  context.skip('Mark all as completed', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.get(selectors.todoItems).as('todos');
    });

    it('should allow me to mark all items as completed', () => {
      cy.get(selectors.toggleAll).check();

      cy.get('@todos').eq(0).should('have.class', 'completed');
      cy.get('@todos').eq(1).should('have.class', 'completed');
      cy.get('@todos').eq(2).should('have.class', 'completed');
    });

    it('should allow me to clear the complete state of all items', () => {
      cy.get(selectors.toggleAll).check();
      cy.get(selectors.toggleAll).uncheck();

      cy.get('@todos').eq(0).should('not.have.class', 'completed');
      cy.get('@todos').eq(1).should('not.have.class', 'completed');
      cy.get('@todos').eq(2).should('not.have.class', 'completed');
    });

    it('complete all checkbox should update state when items are completed / cleared', function () {
      cy.get(selectors.toggleAll).should('not.be.checked');

      cy.get(selectors.toggleAll).check();
      cy.get(selectors.toggleAll).should('be.checked');

      cy.get(selectors.todoItems).first().as('firstTodo').find('.toggle').uncheck();
      cy.get(selectors.toggleAll).should('not.be.checked');

      cy.get('@firstTodo').find('.toggle').check();
      cy.get(selectors.toggleAll).should('be.checked');
    });

    it.skip('should persist completed state of items this way', () => {
      cy.get(selectors.toggleAll).check();
      cy.reload();
      cy.get(selectors.toggleAll).should('be.checked');
      cy.get(selectors.todoItems).should('have.length', 3);
    });
  });

  context.skip('Item', () => {
    it('should allow me to mark items as complete', () => {
      cy.createTodo(todoFixtures[0]).as('firstTodo');
      cy.createTodo(todoFixtures[1]).as('secondTodo');

      cy.get('@firstTodo').find('.toggle').check();
      cy.get('@firstTodo').should('have.class', 'completed');
      cy.get('@secondTodo').should('not.have.class', 'completed');

      cy.get('@secondTodo').find('.toggle').check();
      cy.get('@firstTodo').should('have.class', 'completed');
      cy.get('@secondTodo').should('have.class', 'completed');
    });

    it('should allow me to un-mark items as complete', () => {
      cy.createTodo(todoFixtures[0]).as('firstTodo');
      cy.createTodo(todoFixtures[1]).as('secondTodo');

      cy.get('@firstTodo').find('.toggle').check();
      cy.get('@firstTodo').should('have.class', 'completed');
      cy.get('@secondTodo').should('not.have.class', 'completed');

      cy.get('@firstTodo').find('.toggle').uncheck();
      cy.get('@firstTodo').should('not.have.class', 'completed');
      cy.get('@secondTodo').should('not.have.class', 'completed');
    });

    it('should allow me to edit an item', () => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]).as('todo');

      cy.get('@todo').find('label').dblclick();
      cy.get('@todo').find('.edit').should('have.value', todoFixtures[1])
        .clear()
        .type('E2E Testing with Cypress{enter}');
      cy.get('@todo').find('label').should('contain.text', 'E2E Testing with Cypress');
    });

    it('should save edits on blur', function () {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]).as('todo');

      cy.get('@todo').find('label').dblclick();
      cy.get('@todo').find('.edit').should('have.value', todoFixtures[1])
        .clear()
        .type('E2E Testing with Cypress')
        .blur();
      cy.get('@todo').find('label').should('contain.text', 'E2E Testing with Cypress');
    });

    it('should allow me to delete an item', () => {
      cy.createTodo(todoFixtures[0]).as('todo');
      cy.createTodo(todoFixtures[1]);

      cy.get('@todo').find('.destroy').click({force: true});
      cy.get(selectors.todoItems).should('have.length', 1);
      cy.get(selectors.todoItems).first().contains(todoFixtures[1]);
    });

    it('should remove the item if an empty text string was entered', () => {
      cy.createTodo(todoFixtures[0]).as('todo');
      cy.createTodo(todoFixtures[1]);

      cy.get('@todo').find('label').dblclick();
      cy.get('@todo')
        .find('.edit')
        .clear().type('{enter}');

      cy.get(selectors.todoItems).should('have.length', 1);
      cy.get(selectors.todoItems).first().contains(todoFixtures[1]);
    });

    it.skip('should persist marking/un-marking of items as complete', () => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);

      cy.get(selectors.todoItems).last().find('.toggle').check();
      cy.reload();
      cy.get(selectors.todoItems).last().should('have.class', 'completed');

      cy.get(selectors.todoItems).last().find('.toggle').check();
      cy.reload();
      cy.get(selectors.todoItems).last().should('not.have.class', 'completed');
    });

    it.skip('should persist editing of items', () => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);

      cy.get(selectors.todoItems).last().find('label').dblclick();
      cy.get(selectors.todoItems).last().find('.edit').clear()
        .type('E2E Testing with Cypress{enter}');
      cy.reload();

      cy.get(selectors.todoItems).last().find('label').should('contain.text', 'E2E Testing with Cypress');
    });

    it.skip('should persist edits commited via blur', function () {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);

      cy.get(selectors.todoItems).last().find('label').dblclick();
      cy.get(selectors.todoItems).last().find('.edit')
      .clear()
        .type('E2E Testing with Cypress')
        .blur();
      cy.reload();

      cy.get(selectors.todoItems).last().find('label').should('contain.text', 'E2E Testing with Cypress');
    });

    it.skip('should persist deleting items', () => {
      cy.createTodo(todoFixtures[0]).as('todo');
      cy.createTodo(todoFixtures[1]);

      cy.get('@todo').find('.destroy').invoke('show').click();
      cy.reload();
      cy.get(selectors.todoItems).should('have.length', 1);
    });

    it.skip('should persist deleting items via empty edit text', () => {
      cy.createTodo(todoFixtures[0]).as('todo');
      cy.createTodo(todoFixtures[1]);

      cy.get('@todo').find('label').dblclick();
      cy.get('@todo')
        .find('.edit')
        .clear().type('{enter}');
      cy.reload();

      cy.get(selectors.todoItems).should('have.length', 1);
    });
  });

  context('Editing', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.get(selectors.todoItems).as('todos');
    });

    it('should hide edit fields when not editing', () => {
      cy.get('@todos').find('.edit').should('not.be.visible');
    });

    it('should hide other controls when editing', function () {
      cy.get('@todos').eq(1).find('label').dblclick();

      cy.get('@todos').eq(1).find('.toggle').should('not.be.visible');
      cy.get('@todos').eq(1).find('label').should('not.be.visible');
    });

    it('should allow only one editing element', () => {
      cy.get('@todos').eq(1).find('label').dblclick();
      cy.get('@todos').eq(2).find('label').dblclick();

      cy.get('@todos').eq(1).find('.edit').should('not.be.visible');
      cy.get('@todos').eq(2).find('.edit').should('be.visible');
    });

    it('should focus on the edited todo after entering edit mode', () => {
      cy.get('@todos').eq(1).find('label').dblclick();
      cy.get('@todos').eq(1).find('.edit').should('have.focus');
    });

    it('should trim entered text', () => {
      cy.get('@todos').eq(1).find('label').dblclick();

      cy
        .get('@todos')
        .eq(1)
        .find('.edit')
        .type('{selectall}{backspace}    E2E Testing with Cypress    {enter}');

        cy.get('@todos').eq(1).find('label').should('contain.text', 'E2E Testing with Cypress');
    });

    it('should cancel edits on escape', () => {
      cy.get('@todos').eq(1).find('label').dblclick();

      cy
        .get('@todos')
        .eq(1)
        .find('.edit')
        .type('{selectall}{backspace}Protractor Testing{esc}')

      cy.get('@todos').eq(1).find('label').should('contain.text', todoFixtures[1]);
    });
  });

  /*
 context('Counter', function () {
      it('should display the current number of todo items', function () {
        cy.createTodo(TODO_ITEM_ONE)
        cy.get(selectors.count).contains('1')
        cy.createTodo(TODO_ITEM_TWO)
        cy.get(selectors.count).contains('2')
        checkNumberOfTodosInLocalStorage(2)
      })
    })

    context('Clear completed button', function () {
      beforeEach(function () {
        cy.createDefaultTodos().as('todos')
      })

      it('should display the correct text', function () {
        cy.get('@todos').eq(0).find('.toggle').check()
        cy.get(selectors.clearCompleted).contains('Clear completed')
      })

      it('should remove completed items when clicked', function () {
        cy.get('@todos').eq(1).find('.toggle').check()
        cy.get(selectors.clearCompleted).click()
        cy.get('@todos').should('have.length', 2)
        cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        cy.get('@todos').eq(1).should('contain', TODO_ITEM_THREE)
      })

      it('should be hidden when there are no items that are completed', function () {
        cy.get('@todos').eq(1).find('.toggle').check()
        cy.get(selectors.clearCompleted).should('be.visible').click()
        cy.get(selectors.clearCompleted).should('not.be.visible')
      })
    })

    context('Persistence', function () {
      it('should persist its data', function () {
        // mimicking TodoMVC tests
        // by writing out this function
        function testState () {
          cy
            .get('@firstTodo')
            .should('contain', TODO_ITEM_ONE)
            .and('have.class', 'completed')
          cy
            .get('@secondTodo')
            .should('contain', TODO_ITEM_TWO)
            .and('not.have.class', 'completed')
        }

        cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
        cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
        cy.get('@firstTodo').find('.toggle').check().then(testState)
        // at this point, the app might still not save
        // the items in the local storage, for example KnockoutJS
        // first recomputes the items and still have "[]"
        checkTodosInLocalStorage(TODO_ITEM_ONE, true)
        checkCompletedKeywordInLocalStorage()

        // but there should be 1 completed item
        checkNumberOfCompletedTodosInLocalStorage(1)

        // now can reload
        cy.reload().then(testState)
      })
    })

    context('Routing', function () {
      beforeEach(function () {
        cy.createDefaultTodos().as('todos')
        // make sure the app had a chance to save updated todos in storage
        // before navigating to a new view, otherwise the items can get lost :(
        // in some frameworks like Durandal
        checkTodosInLocalStorage(TODO_ITEM_ONE)
      })

      it('should allow me to display active items', function () {
        cy.get('@todos').eq(1).find('.toggle').check()
        checkNumberOfCompletedTodosInLocalStorage(1)
        cy.contains(selectors.filterItems, 'Active').click()
        visibleTodos()
          .should('have.length', 2)
          .eq(0)
          .should('contain', TODO_ITEM_ONE)
        visibleTodos().eq(1).should('contain', TODO_ITEM_THREE)
      })

      it('should respect the back button', function () {
        cy.get('@todos').eq(1).find('.toggle').check()
        checkNumberOfCompletedTodosInLocalStorage(1)

        cy.log('Showing all items')
        cy.contains(selectors.filterItems, 'All').click()
        visibleTodos().should('have.length', 3)

        cy.log('Showing active items')
        cy.contains(selectors.filterItems, 'Active').click()
        cy.log('Showing completed items')
        cy.contains(selectors.filterItems, 'Completed').click()
        visibleTodos().should('have.length', 1)

        cy.log('Back to active items')
        cy.go('back')
        visibleTodos().should('have.length', 2)

        cy.log('Back to all items')
        cy.go('back')
        visibleTodos().should('have.length', 3)
      })

      it('should allow me to display completed items', function () {
        visibleTodos().eq(1).find('.toggle').check()
        checkNumberOfCompletedTodosInLocalStorage(1)
        cy.get(selectors.filters).contains('Completed').click()
        visibleTodos().should('have.length', 1)
      })

      it('should allow me to display all items', function () {
        visibleTodos().eq(1).find('.toggle').check()
        checkNumberOfCompletedTodosInLocalStorage(1)
        cy.get(selectors.filters).contains('Active').click()
        cy.get(selectors.filters).contains('Completed').click()
        cy.get(selectors.filters).contains('All').click()
        visibleTodos().should('have.length', 3)
      })

      it('should highlight the currently applied filter', function () {
        cy
          .contains(selectors.filterItems, 'All')
          .should('have.class', 'selected')
        cy.contains(selectors.filterItems, 'Active').click()
        // page change - active items
        cy
          .contains(selectors.filterItems, 'Active')
          .should('have.class', 'selected')
        cy.contains(selectors.filterItems, 'Completed').click()
        // page change - completed items
        cy
          .contains(selectors.filterItems, 'Completed')
          .should('have.class', 'selected')
      })
    })
  })
  */
});
