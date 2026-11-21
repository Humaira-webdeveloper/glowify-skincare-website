
const products = [
    {
        name: "Gentle Foaming Cleanser",
        skin: ["Oily", "Combination", "Normal"],
        ingredient: "Gentle Cleansing",
        price: 2499,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500",
        description: "A gentle cleanser for removing dirt and excess oil."
    },
    {
        name: "Hyaluronic Moisturizer",
        skin: ["Dry", "Normal", "Sensitive"],
        ingredient: "Hyaluronic Acid",
        price: 2999,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
        description: "Helps hydrate and soften the skin."
    },
    {
        name: "Niacinamide Serum",
        skin: ["Oily", "Combination", "Normal"],
        ingredient: "Niacinamide",
        price: 2199,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500",
        description: "Supports the skin barrier and balances oil."
    },
    {
        name: "Salicylic Acid Cleanser",
        skin: ["Oily", "Combination"],
        ingredient: "Salicylic Acid",
        price: 1899,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
        description: "Helps unclog pores and remove excess oil."
    },
    {
        name: "Soothing Moisturizer",
        skin: ["Sensitive", "Dry"],
        ingredient: "Gentle Hydration",
        price: 2799,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500",
        description: "A simple moisturizer for dry and sensitive skin."
        },
    {
        name: "Daily Sunscreen SPF 50",
        skin: ["Oily", "Dry", "Sensitive", "Normal", "Combination"],
        ingredient: "UV Protection",
        price: 1999,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
        description: "Helps protect skin from harmful UV rays."
    }
];

const skinGuides = {
    Oily: "Oily skin: Choose gentle cleansers, lightweight moisturizers and non-comedogenic sunscreen. Niacinamide and salicylic acid may help.",
    Dry: "Dry skin: Choose a gentle cleanser and a rich moisturizer. Hyaluronic acid and ceramides can support hydration.",
    Sensitive: "Sensitive skin: Choose fragrance-free gentle products. Avoid introducing several active ingredients at once.",
    Combination: "Combination skin: Use lightweight hydration and gentle cleansing. Treat different areas according to their needs.",
    Normal: "Normal skin: Maintain a simple routine with cleanser, moisturizer and daily sunscreen."
};
const productList = document.getElementById("product-list");
const skinInfo = document.getElementById("skin-info");

let cartCount = 0;

function displayProducts(items) {

    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><b>Ingredient:</b> ${product.ingredient}</p>
            <p><b>Suitable for:</b> ${product.skin.join(", ")}</p>
            <div class="price">Rs. ${product.price.toLocaleString("en-PK")}</div>
            <button onclick="addToCart(${index})">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);
    });
}
function filterSkin(type) {

    if (type === "All") {
        displayProducts(products);
        skinInfo.innerHTML = "Showing all skincare products.";
        return;
    }

    const filtered = products.filter(product =>
        product.skin.includes(type)
    );

    displayProducts(filtered);
    skinInfo.innerHTML = skinGuides[type];
}

function addToCart(index) {
    cartCount++;

    document.getElementById("cart-count").innerText = cartCount;

    alert(products[index].name + " added to your cart!");
}

// Initial products
displayProducts(products);
// GLOWIFY SKIN ANALYZER

function previewSkinPhoto(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
    }

    const preview = document.getElementById("photoPreview");

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
}
// ANALYZE SKIN

function analyzeSkin() {

    const skinType = document.getElementById("skinType").value;
    const concern = document.getElementById("skinConcern").value;

    const result = document.getElementById("analysisResult");

    if (!skinType || !concern) {
        alert("Please select your skin type and main concern.");
        return;
    }

    const recommendations = {

        Oily: {
      routine: "Use a gentle cleanser, lightweight moisturizer and daily sunscreen.",
            ingredients: "Niacinamide and Salicylic Acid may be useful."
        },

        Dry: {
            routine: "Use a gentle cleanser, hydrating moisturizer and daily sunscreen.",
            ingredients: "Hyaluronic Acid and Ceramides support hydration."
        },

        Sensitive: {
            routine: "Choose fragrance-free gentle products and introduce new products slowly.",
            ingredients: "Gentle moisturizers and barrier-supporting ingredients are good options."
        },

        Combination: {
            routine: "Use gentle cleansing and lightweight hydration. Adjust products to different areas.",
            ingredients: "Niacinamide and Hyaluronic Acid may be suitable."
    
        },

        Normal: {
            routine: "Maintain a simple routine with cleanser, moisturizer and sunscreen.",
            ingredients: "Niacinamide and Hyaluronic Acid are common options."
    }

};

    const concernTips = {
        Acne: "Choose non-comedogenic products. Salicylic Acid may help unclog pores.",
        Dryness: "Focus on hydration and barrier-supporting moisturizers.",
        Dullness: "Gentle skincare and daily sun protection can support an even-looking complexion.",
        Sensitivity: "Avoid harsh scrubs and introduce new products one at a time.",
        Hydration: "Look for humectants such as Hyaluronic Acid."
    };

    const selected = recommendations[skinType];

    result.innerHTML = `
    <h3>✨ Your Personalized Skin Report</h3>

        <p><b>Selected Skin Type:</b> ${skinType} Skin</p>

        <p><b>Main Concern:</b> ${concern}</p>

        <p><b>Suggested Routine:</b><br>
        ${selected.routine}</p>

        <p><b>Ingredient Guide:</b><br>
        ${selected.ingredients}</p>

        <p><b>Your Concern Tips:</b><br>
        ${concernTips[concern]}</p>

        <h4>Daily Skincare Essentials</h4>

        <ul>
            <li>Gentle cleanser</li>
            <li>Suitable moisturizer</li>
            <li>Broad-spectrum SPF 30 or higher</li>
        </ul>

        <p><small>
        This is an educational demo based on your answers,
        not an AI photo diagnosis or medical assessment.
        Always patch test new products.
        </small></p>
    `;

    result.style.display = "block";

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}