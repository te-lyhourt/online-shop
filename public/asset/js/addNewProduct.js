$(function () {
    $(".close-button").click(()=>{
        setTimeout(function(){
            window.location.href = window.location.href
        },2000)
    })
})

function deleteProduct(id) {
    // console.log("js    " + id);
    axios.delete('http://localhost:3000/admin/'+id)
         .then(result => {
            console.log("axios  "+result)
         })
         .catch(err => {
           console.log(err);
         })
}

function getProduct(id) {
    // console.log("js    " + id);
    axios.get('http://localhost:3000/product/'+id)
         .then(result => {
            console.log("axios  "+result)
         })
         .catch(err => {
           console.log(err);
         })
}