$(function () {
    $("#btnSavePost").click(saveProduct)
    
})

function saveProduct(){
    const formData = new FormData(document.querySelector('form'))
    let dataToSubmit = {};
    for (var pair of formData.entries()) {
        dataToSubmit[pair[0]] = pair[1];
    }
    axios.post('http://localhost:3000/post', dataToSubmit)
    .then(product => {
        console.log(product);
        let newProduct = document.createElement("div");
        newProduct.innerHtml = `
        <td class="image-container">                                
            <img class = "image"src="asset\photo\ct-2.png">
        </td>
        <td class="name">${product.name}<br></td>
        <td class="qty">${product.qty}<br></td>
        <td class="detail">${product.detail} <br></td>
        <td class="date">${product.date}<br></td>
        <td class="catagory">${product.catagory}<br></td>
        <td class="action">
            <button class="icon"><i class="fas fa-edit" onclick="updarteProduct(this.id)"></i></button>
            <button class="icon"><i class="far fa-trash-alt" onclick="deleteProduct(this.id)"></i></button>
        </td>
        `;
        let productContainer = $(".product-container");
        productContainer.insertBefore(newProduct, productContainer.children[0]);

    }).catch(err => {
        console.log(err);
    });
 
}

function getProduct(){
    
    axios.get('http://localhost:3000/posts')
    .then(result => {
        console.log(result);
        
        let productContainer = $(".product-container");

        result.data.forEach(element => {

            let newProduct = document.createElement("div");
            newProduct.innerHtml = `
            <td class="image-container">                                
                <img class = "image"src="asset\photo\ct-2.png">
            </td>
            <td class="name">Hand Bag<br></td>
            <td class="qty">40<br></td>
            <td class="detail"> Hand Bag for ladies <br></td>
            <td class="date">22nd,Jan 2021<br></td>
            <td class="catagory">Bag<br></td>
            <td class="action">
                <button class="icon"><i class="fas fa-edit"></i></button>
                <button class="icon"><i class="far fa-trash-alt"></i></button>
            </td>
            `;
            
            productContainer.insertBefore(newProduct, productContainer.children[0]);
        })

    }).catch(err => {
        console.log(err);
    });
}

getProduct