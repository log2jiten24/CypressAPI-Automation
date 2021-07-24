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

    cy.request({
    method: 'POST',
    url: 'https://gorest.co.in/public/v1/users',
    headers: {
    'Authorization': 'Bearer ' + accessToken
    },
    body :{
    "name" : datajSon.name,
    "gender":datajSon.gender,
    "email" :testEMail,
    "status" : datajSon.status
   }

}).then ((res) =>{
    cy.log(JSON.stringify(res))
    expect(res.status).to.eql(201)
    expect(res.body.data).has.property('email', testEMail)
    expect(res.body.data).has.property('name' , datajSon.name )
    expect(res.body.data).has.property('gender', datajSon.gender)
    expect(res.body.data).has.property('status', datajSon.status)      
})

    });
})

 





