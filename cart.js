$(document).ready(function() {
    var productItem = [{
        productName: "Popular Package",
        price: "8.50",
        photo: "p1.png"
    },
    {
        productName: "Mega Package",
        price: "12.25",
        photo: "p2.png"
    },
    {
        productName: "Lunch Special",
        price: "6.49",
        photo: "p3.png"
    },
    {
        productName: "Shish Kebab",
        price: "29.99",
        photo: "4.png"
    },
    {
            productName: "Biryani",
            price: "11.99",
            photo: "1.png"
        },
        {
            productName: "Chicken Curry",
            price: "13.99",
            photo: "2.png"
        },
        {
            productName: "Samosa",
            price: "4.99",
            photo: "3.png"
        },
        {
            productName: "Shish Kebab",
            price: "29.99",
            photo: "4.png"
        },
        {
            productName: "Cheeseburger",
            price: "10.99",
            photo: "5.png"
        },
        {
            productName: "Medjool Dates",
            price: "9.99",
            photo: "6.png"
        },
        {
            productName: "Jalebi",
            price: "7.99",
            photo: "7.png"
        },
        {
            productName: "Fruit Juice",
            price: "10.99",
            photo: "8.png"
        },
        {
            productName: "Smoothie",
            price: "11.99",
            photo: "9.png"
        },
        {
            productName: "Lemon Tea",
            price: "7.99",
            photo: "10.png"
        },
        {
            productName: "Biryani",
            price: "11.99",
            photo: "1.png"
        },
        {
            productName: "Chicken Curry",
            price: "13.99",
            photo: "2.png"
        }];
    showProductGallery(productItem);
    showCartTable();
});

function addToCart(element) {
    var productParent = $(element).closest('div.product-item');

    var price = $(productParent).find('.price span').text();
    var productName = $(productParent).find('.productname').text();
    var quantity = $(productParent).find('.product-quantity').val();

    var cartItem = {
        productName: productName,
        price: price,
        quantity: quantity
    };
    var cartItemJSON = JSON.stringify(cartItem);

    var cartArray = new Array();
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem('shopping-cart')) {
        cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    }
    cartArray.push(cartItemJSON);

    var cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem('shopping-cart', cartJSON);
    showCartTable();
}

function emptyCart() {
    if (sessionStorage.getItem('shopping-cart')) {
        // Clear JavaScript sessionStorage by index
        sessionStorage.removeItem('shopping-cart');
        showCartTable();
    }
}

function removeCartItem(gallery) {
    if (sessionStorage.getItem('shopping-cart')) {
        var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
        sessionStorage.removeItem(shoppingCart[gallery]);
        showCartTable();
    }
}

function showCartTable() {
    var cartRowHTML = "";
    var itemCount = 0;
    var grandTotal = 0;

    var price = 0;
    var quantity = 0;
    var subTotal = 0;

    if (sessionStorage.getItem('shopping-cart')) {
        var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
        itemCount = shoppingCart.length;

        //Iterate javascript shopping cart array
        shoppingCart.forEach(function(item) {
            var cartItem = JSON.parse(item);
            price = parseFloat(cartItem.price);
            quantity = parseInt(cartItem.quantity);
            subTotal = price * quantity
           

            cartRowHTML += "<tr>" +
                "<td>" + cartItem.productName + "</td>" +
                "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
                "<td class='text-right'>" + quantity + "</td>" +
                "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
                "</tr>";

            grandTotal += subTotal;
        });
    }

    $('#cartTableBody').html(cartRowHTML);
    $('#itemCount').text(itemCount);
    $('#totalAmount').text("$" + grandTotal.toFixed(2));
}


function showProductGallery(product) {
    //Iterate javascript shopping cart array
    var productHTML = "";
    product.forEach(function(item) {
        productHTML += '<div class="product-item">'+
                    '<img src="product-images/' + item.photo + '">'+
                    '<div class="productname">' + item.productName + '</div>'+
                    '<div class="price">$<span>' + item.price + '</span></div>'+
                    '<div class="cart-action">'+
                        '<input type="number" class="product-quantity" name="quantity" value="1" size="2" />'+
                        '<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this); alert(\'Item added\');" />'+
                    '</div>'+
                '</div>';
                "<tr>";
        
    });
    $('#product-item-container').html(productHTML);
}

