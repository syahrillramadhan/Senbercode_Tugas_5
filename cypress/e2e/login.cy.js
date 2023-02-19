describe('Login', () => {
    it('Should open login page first', () => {
        cy.visit('https://kasirdemo.belajarqa.com')
        cy.url().should ('include', '/login')
        cy.contains("hai, kasirAja")
    })

    it("Contains email and password Input, and login button", () => {
        //check email
        const email = cy.get("input[id='email']")
        email.should('be.visible')
        email.should("have.attr", "type", "email")
        email.should("have.attr", "placeholder", "email")

        //check password
        const password = cy.get("input[id='password']")
        password.should('be.visible')
        password.should("have.attr", "type", "password")
        password.should("have.attr", "placeholder", "password")

        //check button login
        const btnLogin = cy.get(".chakra-button")
        btnLogin.should('be.visible')
        btnLogin.contains("login")
        btnLogin.should("have.attr", "type", "submit")
        btnLogin.should("have.css", "background-color", "rgb(229, 62, 62)")
        btnLogin.should("have.css", "color", "rgb(255, 255, 255)")
    })

    //@negativeScenario
    it("Do login with null value", () => {
        const btnLogin = cy.get(".chakra-button")
        btnLogin.click()
        cy.on("window:alert", (text) => {
            expect(text).to.contains('"email" is not allowed to be empty')
        })
    })

    //@negativeScenario
    it("Do login with invalid password", () => {
        const email = cy.get("input[id='email']")
        email.type("syahrill.ramadhan02@gmail.com")

        const btnLogin = cy.get(".chakra-button")
        btnLogin.click()

        //Hapus value email
        email.clear()

        cy.on("window:alert", (text) => {
            expect(text).to.contains('"password" is not allowed to be empty')
        })
    })

    //@negativeTest
    it("Do login with invalid credential", () => {
        const email = cy.get("input[id='email']")
        email.type("syahrill.ramadhan02@gmail.com")

        const password = cy.get("input[id='password']")       
        password.type("pass123")

        const btnLogin = cy.get(".chakra-button")
        btnLogin.click()
        //get alert message
        cy.on("window:alert", (text) => {
            expect(text).to.contains('Kredensial yang Anda berikan salah')
        })  

        email.clear()
        password.clear()
    })    

    //@positiveScenario
    it("Do login with valid credential", () => {
        const email = cy.get("input[id='email']")
        email.type("syahrill.ramadhan02@gmail.com")

        const password = cy.get("input[id='password']")       
        password.type("sanbercode123")

        const btnLogin = cy.get(".chakra-button")
        btnLogin.click()
        
        // should be redirected to dashboard page /dashboard
        cy.url().should('include', '/dashboard')
  
        // should contains text "kasirAja"
        cy.contains("kasirAja")
    })
});