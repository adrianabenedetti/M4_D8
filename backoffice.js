//funzione che aggiunge un nuovo prodotto
const addProduct = async (name, desc, brand, imgUrl, price) => {
  const myProduct = {
    name: name,
    description: desc,
    brand: brand,
    imageUrl: imgUrl,
    price: price,
  };

  try {
    showLoader();
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(myProduct),
    });
    const result = await response.json();
    hideLoader();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//funzione che resetta i campi
const resetFields = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
};

//funzione che crea la lista dei prodotti
const createProductList = (products, section) => {
    const list = document.createElement('ol');
    products.forEach((item) => {
        const listItem = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('margin');
        span.innerText = item.name;
        const editButton = document.createElement("button");
        editButton.innerText = "Modifica";
        editButton.classList.add('margin');
        editButton.addEventListener("click", () => {
          openDialogBox(item);
        });
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Cancella";
        deleteButton.classList.add('margin');
        listItem.append(span, editButton, deleteButton);
        deleteButton.addEventListener("click", async () => {
        if (confirm("Sei sicuro di eliminare il prodotto selezionato?")) {
            await deleteProduct(item._id);
            window.location.reload();
        }
        });
        list.append(listItem);
  });
  section.append(list);
};

//funzione che elimina un prodotto
const deleteProduct = async (id) => {
  try {
    showLoader();
    await fetch(endpoint + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "DELETE",
    });
    hideLoader();
  } catch (error) {
    console.log(err);
  }
};

//funzione che verifica se i campi sono tutti compilati
const checkInputs = (inputs) => {
  for (let input of inputs) {
    if (input.value === "") {
      return false;
    }
  }
  return true;
};

//funzione di validazione del prezzo
const checkPrice = (input) => {
  if (isNaN(input.value)) {
    return false;
  } else {
    return true;
  }
};

//funzione di validazione dei dati
const checkData = (inputs) => {
  let priceInput;
  for(let input of inputs) {
    if (input.id.includes("price")) {
      priceInput = input;
    }
  }
  if (checkInputs(inputs) && checkPrice(priceInput)) {
    return true;
  } else {
    if (!checkInputs(inputs)) {
      return "Tutti i campi devono essere compilati!";
    } else {
      return "Verifica il prezzo inserito per il prodotto";
    }
  }
};

//funzione che restituisce il valore contenuto in un input specifico
const getInputValue = (inputs, id) => {
    let result;
    for(let input of inputs) {
      if (input.id === id) {
        result = input.value;
      }
    }
    return result;
};

//funzione che apre la finestra di dialogo
const openDialogBox = (product) => {
    const dialog = document.getElementById('dialogBox');
    setDialogBoxValues(dialog, product);
    setDialogBoxListeners(dialog, product);
    dialog.show();
};

//funzione che imposta i valori della finestra di dialogo
const setDialogBoxValues = (dialogBox, product) => {
  const inputs = dialogBox.getElementsByTagName('input');
  for(let input of inputs) {
    switch(input.id) {
      case 'd-name':
        input.value = product.name;
        break;
      case 'd-description':
        input.value = product.description;
        break;
      case 'd-brand':
        input.value = product.brand;
        break;
      case 'd-imageUrl':
        input.value = product.imageUrl;
        break;
      case 'd-price':
        input.value = product.price;
        break;
    }
  }
};

//funzione che restituisce il prodotto presente nella finestra di dialogo
const getDialogBoxValues = (dialogBox, product) => {
  const inputs = dialogBox.getElementsByTagName('input');
  for(let input of inputs) {
    switch(input.id) {
      case 'd-name':
        product.name = input.value;
        break;
      case 'd-description':
        product.description = input.value;
        break;
      case 'd-brand':
        product.brand = input.value;
        break;
      case 'd-imageUrl':
        product.imageUrl = input.value;
        break;
      case 'd-price':
        product.price = input.value;
        break;
    }
  }
  return product;
};

//funzione che imposta i listener per la finestra di dialogo
const setDialogBoxListeners = (dialogBox, product) => {
  const saveButton = document.querySelector("#dialogBox > #saveButton");
  saveButton.addEventListener('click', async () => {
    const inputs = document.querySelectorAll("#dialogBox > input");
    const check = checkData(inputs);
    if (check === true) {
      await changeProduct(dialogBox, product);
      dialogBox.close();
      window.location.reload();
    } else {
      alert(check);
    }
  });
  const closeButton = document.querySelector("#dialogBox > #closeButton");
  closeButton.addEventListener('click', () => {
    dialogBox.close();
  });
};

//funzione che modifica un prodotto
const changeProduct = async (dialogBox, product) => {
  const id = product._id;
  const myProduct = getDialogBoxValues(dialogBox, product);

  try {
      showLoader();
      await fetch(endpoint + id, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-type": "application/json"
          },
          method: 'PUT',
          body: JSON.stringify(myProduct),
      });
      hideLoader();
  } catch (error) {
      console.log(error);
  }
};

//funzione di inizializzazione della pagina
const init = async () => {
  const addButton = document.getElementById("addProduct");
  //imposto un listener associato al pulsante di aggiunta del prodotto
  addButton.addEventListener("click", async () => {
    //recupero gli input del form
    const inputs = document.querySelectorAll(".form > input");
    //verifico la consistenza dei dati
    const check = checkData(inputs);
    if (check === true) {
      //recupero le informazioni del prodotto inserite dall'utente
      const name = getInputValue(inputs, 'name');
      const description = getInputValue(inputs, 'description');
      const brand = getInputValue(inputs, 'brand');
      const imgUrl = getInputValue(inputs, 'imageUrl');
      const price = getInputValue(inputs, 'price');
      //aggiungo il nuovo prodotto
      const data = await addProduct(
        name,
        description,
        brand,
        imgUrl,
        parseFloat(price)
      );
      //reset dei campi
      resetFields();
      window.location.reload();
    } else {
      //alert che appare in caso di problemi con i dati
      alert(check);
    }
  });
  const products = await getProducts();
  const section = document.querySelector('.productList');
  createProductList(products, section);
};

//inizializzazione della pagina
init();
