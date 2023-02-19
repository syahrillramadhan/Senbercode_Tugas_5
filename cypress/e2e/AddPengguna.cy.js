describe('Add Product', () => {
    //visit to kasiraja page
    it('Should open login page first', () => {
      cy.visit('https://kasirdemo.belajarqa.com')
      cy.url().should('include', '/login')
    })
  
    //@login
    it("User can login in the kasiraja page", () => {
        const email = cy.get("input[id='email']")
        email.type("syahrill.ramadhan02@gmail.com")
        const password = cy.get("input[id='password']")       
        password.type("sanbercode123")
        const btnLogin = cy.get(".chakra-button")
        btnLogin.click()
        
        // should be redirected to dashboard page /dashboard
        cy.url().should('include', '/dashboard')
        cy.contains("kasirAja")
    })

    // Create pengguna
    it('User can create data pengguna', () => {
        const menuPengguna = cy.get('#root > div > div > div.css-tnxwfz > div > a:nth-child(8) > div')
        menuPengguna.click()
        const addPengguna = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > a')
        addPengguna.click()
        //input data category
        cy.get("input[id='nama']").type('syahril')
        cy.get("input[id='email']").type('syahrill.ramadhan17@gmail.com')
        cy.get("input[id='password']").type('sanbercode123')        

        const btnSimpan = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > button')
        btnSimpan.click()

        //Show toaster
        cy.on("window:alert", (text) => {
            expect(text).to.contains('sukses')
        })
    })   

    //can't add category when no value
    it('User cannot create data pengguna without no value', () => {
        const menuPengguna = cy.get('#root > div > div > div.css-tnxwfz > div > a:nth-child(8) > div')
        menuPengguna.click()
        const addPengguna = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > a')
        addPengguna.click()
        const btnSimpan = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > button')
        btnSimpan.click()

        cy.on("window:alert", (text) => {
            expect(text).to.contains('"name" is not allowed to be empty')
        })
    })    



})