class Cart {
    static addToCart(newId) { // Add an item to the cart based on it's id
        newId = parseInt(newId) // Make the id an integer

        let currentCart  = ( sessionStorage.cart != undefined ) ? JSON.parse(sessionStorage.cart) : [] // Look up ternary operations.
        
        /*
        The above is the same as follows ==================

        let currentCart
        if(sessionStorage.cart != undefined) {
            currentCart = JSON.parse(sessionStorage.cart) 
        } else {
            currentCart = []
        }

        ==================================================

        sessionStorage is a special object that allows you to store data until the user closes the tab.
        Therefore, sessionStorage.cart stores the cart info until the users leaves. I love JS!!!!

        */

        let qtyChanged = false; // Whether the quantity was changed
        for(i = 0; i < currentCart.length; i++) { // For every index in the currentCart
            if(currentCart[i].id == newId) { // If the cart item corresponds to the id of the product being added
                currentCart[i].qty += 1 // Increase the carts quantity for that item
                qtyChanged = true
                break
            }
        }
        
        if(!qtyChanged) { // If the quatity was not changed menaing the item is not already in the cart
            currentCart.push({ // Add the new item to the cart
                "id":newId,
                "qty":1
            })
        }

        sessionStorage.cart = JSON.stringify(currentCart) // sessionStorage can only store strings so you need to use the JSON function to conver the currentCart object into a string
    }

    static getCart() {
        return (sessionStorage.cart == undefined) ? [] : JSON.parse(sessionStorage.cart) // Look up ternary operations. JSON.parse makes the session storage variable into an object.
    }

    static getProductInfo(id) { // Gets the product info based on it's id

        // Look up async functions. I dont undertand them.

        return jQuery.getJSON("./products.json").then( (data) => { // Load the json file then, after it's loaded
            for(let i = 0; i < data.products.length; i++) { //Iterate through it
                if(data.products[i].id == id) { // Looking for the product with the id passed
                    return data.products[i] // return the pruduct object with all the important info
                }
            }
        })
    }
}

window.Cart = Cart