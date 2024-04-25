describe("To-Do list Application test", () => {
  beforeEach(() => {
    cy.visit("https://akshay-u-kunder.github.io/To-do-list/") //launch application
  })

  it("Verify Title", () => {
    cy.title().should("eq", "To-Do List")
  })

  it("Test for Page Header and image", () => {
    cy.get("img[src='images/icon.png']").should("be.visible")
    cy.get("div[class='todo-app'] h1").contains("To-Do List")
  })

  it("Add task and verify in list", () => {
    cy.get("#task-input").type("Test 1")
    cy.get("#add-task-btn").click()

    cy.get("li:nth-child(1)").contains("Test 1")
  })

  it("completed task marking test and delete task", () => {
    cy.get("#task-input").type("Test 1")
    cy.get("#add-task-btn").click()

    cy.get("li:nth-child(1)").should(
      "not.have.css",
      "text-decoration",
      "line-through solid rgb(85, 85, 85)"
    )

    cy.get("li:nth-child(1)").click() // mark Task as completed

    cy.get("li:nth-child(1)").should(
      "have.css",
      "text-decoration",
      "line-through solid rgb(85, 85, 85)"
    )

    //delete task
    cy.get("li[class='task-item completed'] span[class='close']").click()
    cy.get("#list-content")
      .invoke("text", { force: true })
      .should("not.contain", "Test 1")
  })

  it("checking about filters working", () => {
    //Adding 4 tasks
    cy.get("#task-input").type("Test 1")
    cy.get("#add-task-btn").click()

    cy.get("#task-input").type("Test 2")
    cy.get("#add-task-btn").click()

    cy.get("#task-input").type("Test 3")
    cy.get("#add-task-btn").click()

    cy.get("#task-input").type("Test 4")
    cy.get("#add-task-btn").click()

    //making task 2 & 3 as completed
    cy.get("#task-list > :nth-child(2)").click()
    cy.get("#task-list > :nth-child(3)").click()

    //load only active or pending tasks
    cy.get("#filter-active").click()
    //cy.get("#list-content").contains("Test 1")
    //cy.get("#list-content").contains("Test 4")
    cy.get("#list-content").should(($el) => {
      const text = $el.text()
      expect(text).to.not.include("Test 2")
      expect(text).to.not.include("Test 3")
      expect(text).to.include("Test 1")
      expect(text).to.include("Test 4")
    })

    //click All and check all 4 task should be visible
    cy.get("#filter-all").click()

    cy.get("#list-content").should(($el) => {
      const text = $el.text()
      expect(text).to.include("Test 1")
      expect(text).to.include("Test 2")
      expect(text).to.include("Test 3")
      expect(text).to.include("Test 4")
    })

    //click completed and check completed task only should be visible
    cy.get("#filter-completed").click()
    cy.get("#list-content").should(($el) => {
      const text = $el.text()
      expect(text).to.not.include("Test 1")
      expect(text).to.include("Test 2")
      expect(text).to.include("Test 3")
      expect(text).to.not.include("Test 4")
    })

    //click clear completed and click add check other than completed task only should be visible
    cy.get("#filter-all").click()
    cy.get("#clear-completed").click()
    cy.get("#list-content").should(($el) => {
      const text = $el.text()
      expect(text).to.include("Test 1")
      expect(text).to.not.include("Test 2")
      expect(text).to.not.include("Test 3")
      expect(text).to.include("Test 4")
    })
  })
})
