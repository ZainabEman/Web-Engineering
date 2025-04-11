const products = [
    {
        name: "Lavender Pearl Handbag",
        price: "$120.00",
        image: "img/bag.jpg", 
        description: "Elegant lavender handbag perfect for evening outings. Features a luxurious pearl handle and a quilted finish."
    },
    {
        name: "Classic Cream Handbag",
        price: "$150.00",
        image: "img/bag2.jpg", 
        description: "A classic cream-colored handbag with a textured surface and sleek gold accents. Ideal for both casual and formal wear."
    },
    {
        name: "Floral Print Handbag",
        price: "$95.00",
        image: "img/bag3.jpg", 
        description: "Chic handbag with a vibrant floral print and red trimming, perfect for adding a pop of color to any outfit."
    }
];

document.getElementById('productList').innerHTML = products.map((product, index) =>
    `<li onclick="displayProduct(${index})">${product.name}</li>`
).join('');

function displayProduct(index) {
    const product = products[index];
    const container = document.getElementById('productContainer');
    container.innerHTML = `
        <div class="productCard">
            <div class="front">
                <img src="${product.image}" alt="${product.name}" style="height: 100px;">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
            <div class="back">
                <p>${product.description}</p>
                <button class="button" onclick="buyProduct('${product.name}')">Buy Now</button>
            </div>
        </div>
    `;
}

function buyProduct(productName) {
    console.log(`${productName} has been bought!`);
}

document.querySelector('#toggleDarkMode input').addEventListener('change', function() {
    const isDarkMode = this.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('productContainer').style.backgroundColor = isDarkMode ? '#282828' : '#f0f0f0';
    document.getElementById('sidebar').classList.toggle('dark-mode', isDarkMode);
});

// Initially display the first product
displayProduct(0);
