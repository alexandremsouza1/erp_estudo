
//Converter date em String
exports.formatarDataHora = (date) => {
    let formatData = date.substring(0,10).split('-')
    let hora = date.substring(11,16)
    let dataHoraFormatada = formatData[2]+'/'+formatData[1]+'/'+formatData[0]+ ' as '+hora
    return dataHoraFormatada
}

exports.tratarNumeroCelularComDDD = (ddd, numero) =>{
    if(ddd != null) ddd = ddd.replace(' ','') 
    if(ddd === null || ddd == undefined || numero != null || numero != undefined){
        if(numero != null || numero != undefined){
            numero = numero.replace("(", "").replace(")","").replace(" ","").replace("-","").trim()
            if(numero.substring(0,1) == 0){
                return adicionarNove(numero.substring(1,12))
            }else{
                return adicionarNove(numero)
            } 
        }
    }else{
        numero = numero.replace("(", "").replace(")","").replace(" ","").replace("-","").trim()
        if(ddd.substring(0,1) == 0){
            ddd = ddd.substring(1,3)
            return adicionarNove(ddd+''+numero)
        }else{
            return adicionarNove(ddd+''+numero)
        } 
    }
    return numero
}

function adicionarNove(numero){
    if(numero.length == 10){
        ddd = numero.substring(0,2)
        numero = numero.substring(2,10)
        return ddd+'9'+numero
    }else{
        return numero
    }
}