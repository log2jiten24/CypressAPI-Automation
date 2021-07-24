///<reference types = "Cypress" />

describe( 'Get API Request' , ()=>{

    //create global variable at describe level
    let accesstoken = '8f2e0296f4020c8c4773656b29c5befa9070786ae0fa30eed69e7787782e035d';

    it.only ('Get API User Method', ()=>{
    cy.request({

        method : 'GET',
        url : 'https://gorest.co.in/public/v1/users',
        headers : {
        'Authorization' : 'Bearer ' + accesstoken  
           },
                
    }).then((res) =>{
        expect(res.status).to.eq(200)
        expect(res.body.meta.pagination.limit).to.eq(20)
        expect(res.body.data[0].name).to.eq('Mandaakin Asan')
    })

})

it ('Get User by ID Test', ()=>{
    cy.request({

        method : 'GET',
        url : 'https://gorest.co.in/public/v1/users/24',
        headers : {
        'Authorization' : 'Bearer ' + accesstoken   
           }
                
    }).then((res) =>{

        expect(res.status).to.eq(200)
        expect(res.body.data.name).to.eq('Poornima Kocchar JD')
    })

})

})

