import IssueEditDetails from "../pages/IssueEditDetails"

describe('Issue details editing', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
            cy.visit(url + '/board')
            cy.contains('This is an issue of type: Task.').click()
        })
    })

    it('Should update type, status, assignees, reporter, priority successfully', () => {
        IssueEditDetails.updateIssue()
        cy.log('Result: Issue type should be Story, status Done, Lord Gaben and Baby Yoda should be added as assignees, reporter Pickle Rick and priority Medium')
    })

    it('Should update title, description successfully', () => {
        IssueEditDetails.updateIssueTitleDescription()
        cy.log('Result: Title field should display an adjective from @faker-js/faker and description field should display a hacker phrase from @faker-js/faker')
    })

    it('Should delete an issue successfully', () => {
        IssueEditDetails.deleteIssueFindTrashIcon()
        IssueEditDetails.deleteIssueAndAssert()
        cy.log('Result: An opened issue was deleted')
    })

})