//endpoint da contattare e token da utilizzare per la fetch
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM1NjVlZWUwYjNjNzAwMTQ5YWU0NTEiLCJpYXQiOjE2ODEzOTc0ODIsImV4cCI6MTY4MjYwNzA4Mn0.huwM3OZhPKAI_3cDXa8fWitqGnLC4ccSegozqtowGy4";

//funzione che recupera i prodotti dall'endpoint
const getProducts = async () => {

    try {
        showLoader();
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        });
        const products = await response.json();
        hideLoader();
        return products;
    } catch (error) {
        console.log(error);
    }

};

//funzione che mostra il loader
const showLoader = () => {
    const loader = document.querySelector('div.loader');
    loader.style.display = 'block';
};

//funzione che nasconde il loader
const hideLoader = () => {
    const loader = document.querySelector('div.loader');
    loader.style.display = 'none';
};