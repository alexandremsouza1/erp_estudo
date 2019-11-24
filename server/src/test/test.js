const firebase = require('../config/firebase');
const axios = require("axios");
const constants = require('../constants/constants');

const usuario = {
    id: 3311227,
    access_token: "78l~987lõ87op´1928373847",
    email: "pedromelo@gmail.com",
    first_name: "Pedro",
    nick_name: "Americana",
    refresh_token: "7op9870op987ó0987928370984705"
}

const usuario02 = {
    id: 987654,
    access_token: "8888888888888888888888888",
    email: "comproline.ecoomercer@gmail.com",
    first_name: "Felipe",
    nick_name: "COMPROLINE COMERCIO DE PRODUTOS ONLINE",
    refresh_token: "987P98P798P798P798P79P879P87"
}

const usuario03 = {
    id: 336659,
    access_token: "22222222222222555444411111",
    email: "jurubeba@gmail.com",
    first_name: "João",
    nick_name: "JOAOANTONIO",
    refresh_token: "0Q02Q02Q01W01W01A01A10A98A"
}

const editarUsuario = async () => {
    await axios.put("https://sisiml.firebaseio.com/usuarios.json", usuario).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const salvarUsuario = async () => {
    await axios.post("https://sisiml.firebaseio.com/usuarios.json", usuario03).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const listarTodosUsuarios = async () => {
    const usuarios = await axios.get("https://sisiml.firebaseio.com/usuarios.json").then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const buscarUsuarioPorID = async () => {
    const usuarios = await axios.get(constants.urlbase.COLLECTION_USUARIOS).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const getTodosAnuncios = async () => {
    buscarUsuarioPorID().then(resp => {
        axios.get(`https://api.mercadolibre.com/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(resp => {
            console.log("\n")
            console.log("***** TODOS OS ANUNCIOS *****");
            console.log(resp.data.results);
            console.log("\n")

            resp.data.results.map(result => {
                axios.get(`https://api.mercadolibre.com/items/${result}/`).then(resp => {
                    console.log("*** DETALHES DO ANUNCIO ***");
                    console.log(resp.data);

                }).catch(err => {console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)});
            });
    
        }).catch(err => {console.log("Houve um erro ao listar todos os anuncios: " + err)});
    })
}

//salvarUsuario();
//salvarUsuarioAPI();
//listarViaAPI();
getTodosAnuncios();
