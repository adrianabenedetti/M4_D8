//funzione che crea e restituisce una card
const createCard = () => {
    const bodyCard = '<p id="Name"></p>' + 
    '<p id="Description"></p>' +
    '<p id="Brand"></p>' +
    '<p id="ImageUrl"></p>' +
    '<p id="Price"></p>';
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.style.textDecoration = 'none';
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = bodyCard;
    anchor.append(card);
    return anchor;
};

//funzione che imposta i valori del prodotto nella card
const setCard = (card, product) => {
    const listItems = card.querySelectorAll('p');
    card.href = 'product.html?id=' + product._id;
    card.target = '_blank';
    listItems.forEach(item => {
        let value;
        switch(item.id) {
            case 'Name':
                value = product.name;
                break;
            case 'Description':
                value = product.description;
                break;
            case 'Brand':
                value = product.brand;
                break;
            case 'ImageUrl':
                value = product.imageUrl;
                break;
            case 'Price':
                value = product.price;
                break;
        }
        item.innerHTML = `<strong>${item.id}: </strong>${value}`;
    });
    return card;
};

//funzione che crea la griglia a partire dalla lista dei prodotti
const createPage = (products) => {
    const container = document.querySelector('.container');
    const title = document.querySelector('h1');
    title.style.display = 'block';
    products.forEach(item => {
        let card = createCard();
        card = setCard(card, item);
        container.append(card);
    });
};


//funzione di inizializzazione della pagina
const init = async () => {
    //recupero i dati dall'API
    let products = await getProducts();
    createPage(products);
};

//inizializzazione della pagina
init();