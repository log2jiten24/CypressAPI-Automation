///<reference types = "Cypress" />

describe('intercept example mocking API', ()=> {

it ('test api with intercept', ()=> {

    cy.visit('https://jsonplaceholder.typicode.com/')

    cy.intercept({
    path : '/posts'
    
    }).as('posts')

    cy.get("table:nth-of-type(1) a[href ='/posts']").click()
    
    cy.wait('@posts').then(inter =>{
    //storing the response inside the inter object     
    cy.log(JSON.stringify(inter))
    console.log(JSON.stringify(inter))

    })
         })
                 })