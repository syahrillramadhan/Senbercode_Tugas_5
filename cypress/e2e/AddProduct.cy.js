describe('Add Product', () => {
    it('Should open login page first', () => {
      cy.visit('https://kasirdemo.belajarqa.com')
      cy.url().should('include', '/login')
    })
  
    //@positiveTest
    it("Do login with valid credential", () => {
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

    //@negativeTest
    it('User cannot add customer without input value', () => {
        const menuProduct = cy.get('#root > div > div > div.css-tnxwfz > div > a:nth-child(7) > div')
        menuProduct.click()
        const addProduct = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > a')
        addProduct.click()
        const btnSimpan = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > button')
        btnSimpan.click()

        cy.on("window:alert", (text) => {
            expect(text).to.contains('"name" is not allowed to be empty')
        })
    })    
  
    //@positiveTest
    it('User can add product', () => {
      const menuProduct = cy.get('#root > div > div > div.css-tnxwfz > div > a:nth-child(7) > div')
      menuProduct.click()
      const addProduct = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > a')
      addProduct.click()
      //input data product
      cy.get("input[id='nama']").type('Keyboard')
      cy.get('#deskripsi-label').type('Keyboard mechanical')
      cy.get("input[id='harga beli']").type(1500000)
      cy.get("input[id='harga jual']").type(1600000)
      cy.get('#stok').clear().type(10)
      cy.get('#kategori').click()
      cy.wait(2000)
      cy.get('.css-13n66qk').click()
      cy.wait(2000)

      const btnSimpan = cy.get('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > button')
      btnSimpan.click()
     //get alert message successfully
      cy.on("window:alert", (text) => {
        expect(text).to.contains('sukses')
      })
      //verify product
      cy.contains('Keyboard')
    })
  })