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

    //1st call - Create User 
    cy.request({
    method: 'POST',
    url: 'https://gorest.co.in/public/v1/users',
    headers: {
    'Authorization': 'Bearer ' + accessToken
    },
    body :{
        "name" : "AadyaSingh027",
        "gender": "female",
        "email" : "log2priya23671july@gmail.com",
        "status" : "active"
   }

}).then ((res) =>{
    cy.log(JSON.stringify(res))
    expect(res.status).to.eql(201)
    expect(res.body.data).has.property('email', 'log2priya23671july@gmail.com')
    expect(res.body.data).has.property('name' , 'AadyaSingh027')
    expect(res.body.data).has.property('gender', 'female')
    expect(res.body.data).has.property('status', 'active')   

}).then ((res) =>{
    //get the user id from the POST Response 
    const user_id = res.body.data.id
    cy.log("user id printed :" + user_id)
    //2nd PUT call to update the exisitng user id 
    cy.request({
    
    method: 'PUT',
    url:'https://gorest.co.in/public/v1/users/'+ user_id,
    headers: {
        'Authorization': 'Bearer ' + accessToken
        },
        body :{
            "name" : "Aadya  and Mishti",
            "gender":"female",
            "email" : "log2priya1246julyy@gmail.com",
            "status" : "inactive"
       }

}).then ((res)=> {
    expect(res.status).to.eql(200)
    expect(res.body.data).has.property('id', user_id)
    expect(res.body.data).has.property('email', 'log2priya1246julyy@gmail.com')
    expect(res.body.data).has.property('name' , 'Aadya  and Mishti')
    expect(res.body.data).has.property('gender', 'female')
    expect(res.body.data).has.property('status', 'inactive')     

}).then ((res) =>{
    
    //do on the same user id 
    const user_id = res.body.data.id
    cy.log("user id printed :" + user_id)

   //do the GET call to validate the response , whether the resource updated in the PUT is getting retrieved inside the GET or not.
    cy.request({
    
    method: 'GET',
    url:'https://gorest.co.in/public/v1/users/'+ user_id,
    headers: {
        'Authorization': 'Bearer ' + accessToken
        }   
}).then ((res)=> {
    expect(res.status).to.eql(200)
    expect(res.body.data).has.property('id', user_id)
    expect(res.body.data).has.property('email', 'log2priya1246julyy@gmail.com')
    expect(res.body.data).has.property('name' , 'Aadya  and Mishti')
    expect(res.body.data).has.property('gender', 'female')
    expect(res.body.data).has.property('status', 'inactive')   

    })
})
               })
                })
                      })


