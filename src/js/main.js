import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'


const URL_GENERAL = 'https://api.escuelajs.co/api/v1/categories'  // SE PUEDE CAMBIAR ESTA VARIABLE POR TODAS LAS MENCIONES DE LA url
const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const name = document.querySelector("#name")
const image = document.querySelector("#url-image")
let id 


index()

form.addEventListener('submit', async (event) => {

    
    event.preventDefault()

    if(id === undefined){
        await create(name,image)
    }else{
        await update(id,name,image)
    }
    await index()

    form.reset()
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR

    //evitar que la pagina se recargue
})

tbody.addEventListener('click',  async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS

    if(event.target.classList.contains("btn-danger")){
        id = event.target.getAttribute("data-id")
        await deleteItem(id)
        await index()
    }
    if(event.target.classList.contains("btn-warning")){
        id = event.target.getAttribute("data-id")
        const categoryFound = await find(id)
        name.value = categoryFound.name
        image.value = categoryFound.image
    }
    

})

async function index() {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data = await response.json()

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.name}>
            </td>
            <td>${element.creationAt}</td>
            <td>${element.updatedAt}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    const data = await response.json()
    return data
    
    
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA BUSCAR UNA CATEGORIA
}

async function create(name, image) {

    const newCategory = {
        name: name.value,
        image: image.value
    }
    await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
    })      
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA CREAR UNA CATEGORIA
}

async function update(id,name,image) {
    const updateCategory = {
        name: name.value,
        image: image.value
    }

    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCategory)
    })

    id = undefined
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ACTUALIZAR UNA CATEGORIA
}

async function deleteItem(id) {
    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE',
    })          //ACA DEBEMOS PROGRAMAR LA PETICION PARA ELIMINAR UNA CATEGORIA
}