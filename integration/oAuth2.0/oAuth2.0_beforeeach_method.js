///<reference types = "Cypress" />

describe('oAuth 2.0 Automation flow', ()=>{
    let access_token = '';
    let user_id = '';
    
 //write before block -which will be execute before each it block - perform all the prerequisites to perform the test here 
 //beforeEach block will execute after each it block and generate new token Id 
 beforeEach('generate token and get the User Id', ()=>{
    cy.request({
        //get the token for the access 
        method:'POST',
        url:'/token',
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
        url:'/api/me',
        headers:{
        'Authorization' : 'Bearer ' + access_token
        } 
        }).then(response =>{
        //from the response capture the id and store inside the user_id
        user_id = response.body.id
        cy.log("user id retrieved :" + user_id);

 })
     })
 })
    it ('automate the oAuth workflows with unlock the barn', ()=>{ 
    //perform the POST API Method 
    cy.request({
    //now do Second post call with the help of user id 
    method : 'POST',
    url : '/api/'+user_id+'/barn-unlock',
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
    //multiple it blocks to automate the different workflows
    it ('automate the oAuth workflows with collect eggs from your chickens', ()=>{
    
        //perform the POST API Method 
        cy.request({
        //now do Second post call with the help of user id 
        method : 'POST',
        url : '/api/'+user_id+'/eggs-collect',
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
    //another it block 
    it ('automate the oAuth workflows with Get Number of Eggs Collected', ()=>{
    
        //perform the POST API Method 
        cy.request({
        //now do Second post call with the help of user id 
        method : 'POST',
        url : '/api/'+user_id+'/eggs-count',
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
    //another it block 
    it ('automate the oAuth workflows with Toilet Seat down', ()=>{
    
        //perform the POST API Method 
        cy.request({
        //now do Second post call with the help of user id 
        method : 'POST',
        url : '/api/'+user_id+'/toiletseat-down',
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
    
     //another it block 
     it ('automate the oAuth workflows with Chicken Feed', ()=>{
    
        //perform the POST API Method 
        cy.request({
        //now do Second post call with the help of user id 
        method : 'POST',
        url : '/api/'+user_id+'/chickens-feed',
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
           

                 
                          

                        
                  