describe('check weather information', ()=>{

    it('get weather information for cities', ()=> {
      //1st Get Request 
        cy.request({
        method : 'GET',
        url    : 'https://www.metaweather.com/api/location/search/?query=San'
    
    }).then((resp)=>{
       //capture the city from the firt JSON Response - the first response 
        const city = resp.body[0].title
        return city 
    })
      .then((city) =>{
      //2nd request for the first location/city -fethc the city from the first get request 
        cy.request({
            method :'GET',
            url : 'https://www.metaweather.com/api/location/search/?query='+city

        }).then((resp)=>{
           //chai assertions 
           expect(resp.status).to.eq(200)
            expect(resp.body[0]).to.have.property('title' , city)

        })
           })
              })
                  })

//write another it block to verify the test cases ,it.only means it will execute only the second request 

                  it.only('get weather information for all  cities', ()=> {
                    //1st Get Request 
                      cy.request({ 
                      method : 'GET',
                      url    : 'https://www.metaweather.com/api/location/search/?query=Am'
                  
                  }).then((resp)=>{
                     //capture the location from the firt JSON Response - the first response and store it inside array
                      const location = resp.body
                      return location 
                  })
                    .then((location) =>{
                    //2nd request for the first location/city -fethc the city from the first get request 
                  for (let i = 0; i < location.length ; i ++) {
                     cy.request({
                          method :'GET',
                          //get the location from the array and append as a query parameter and it will append with each location title
                          url : 'https://www.metaweather.com/api/location/search/?query='+location[i].title
              
                      }).then((resp)=>{
                         //chai assertions 
                         expect(resp.status).to.eq(200)
                         //validate the title with the location 
                          expect(resp.body[0]).to.have.property('title' , location[i].title)
              
                      })

                    }//close the for loop
                         })
                            })
                             
                            
