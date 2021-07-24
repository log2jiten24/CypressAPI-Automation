///<reference types = "Cypress" />


const datajSon = require ('../../fixtures/createUser')

describe('Post User API Request' , () => {

    let accessToken = '8f2e0296f4020c8c4773656b29c5befa9070786ae0fa30eed69e7787782e035d'
    let randomText  = ""
    let testEMail   = ""

    it ('create user test', () => {

    var pattern = "ABCDEFGHIJKLMNOPQRSTUVXXYZabcdefghijklmnopqrstuvwxyz" 
    for (var i = 0 ; i < 10 ; i ++) 
    
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEMail =  randomText + '@gmail.com'

   cy.fixture('createUser').then((payload) => {

    //1st call - Create User 
    cy.request({
    method: 'POST',
    url: 'https://gorest.co.in/public/v1/users',
    headers: {
    'Authorization': 'Bearer ' + accessToken
    },
    body :{
    "name" : payload.name,
    "gender":payload.gender,
    "email" :testEMail,
    "status" : payload.status
   }

}).then ((res) =>{
    cy.log(JSON.stringify(res))
    expect(res.status).to.eql(201)
    expect(res.body.data).has.property('email', testEMail)
    expect(res.body.data).has.property('name' , payload.name )
    expect(res.body.data).has.property('gender', payload.gender)
    expect(res.body.data).has.property('status', payload.status)      
}).then ((res) =>{
    
    const user_id = res.body.data.id
    cy.log("user id printed :" + user_id)
    //2nd Get Call
    cy.request({
    
    method: 'GET',
    url:'https://gorest.co.in/public/v1/users/'+ user_id,
    headers: {
        'Authorization': 'Bearer ' + accessToken
        }   
}).then ((res)=> {
    expect(res.status).to.eql(200)
    expect(res.body.data).has.property('id', user_id)
    expect(res.body.data).has.property('email', testEMail)
    expect(res.body.data).has.property('name' , payload.name )
    expect(res.body.data).has.property('gender', payload.gender)
    expect(res.body.data).has.property('status', payload.status)     

})
    })
        })
                })
                      })




