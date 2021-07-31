///<reference types = "Cypress" />

describe('oAuth 2.0 Automation flow', ()=>{

let access_token = '';
let user_id = '';

it ('automate the oAuth workflows', ()=>{
cy.request({
//get the token 
method:'POST',
url:'http://coop.apps.symfonycasts.com/token',
form: true,
body:{
    "client_id" : "Cypress oAuthFlow",
    "client_secret" : "e0017ae4985ba30e09aefb4c50702864",
    "grant_type" : "client_credentials"
}
}).then(response =>{
//store the JSON response in string format 
cy.log(JSON.stringify(response));
cy.log(response.body.access_token);
//from the response capture the access token 
access_token = response.body.access_token;

//get the user_id from the response 
cy.request({
method: 'GET',
url:'http://coop.apps.symfonycasts.com/api/me',
headers:{
'Authorization' : 'Bearer ' + access_token
} 
}).then(response =>{
//from the response capture the id and store inside the user_id
user_id = response.body.id
cy.log("user id retrieved :" + user_id);
//perform the POST API Method 
cy.request({
//now do Second post call with the help of user id 
method : 'POST',
url : 'http://coop.apps.symfonycasts.com/api/'+user_id+'/chickens-feed',
//pass the access token with the help of header 
headers:{
    'Authorization' : 'Bearer ' + access_token
    } 
}).then(response =>{
    cy.log(JSON.stringify(response));
    //verify the response status code 
    expect(response.status).to.equal(200)
})

})
    })
             })
                      })
              