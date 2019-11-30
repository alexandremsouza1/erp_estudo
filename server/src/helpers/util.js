exports.formatarDataHora = (data) => {
    let formatData = data.substring(0,10).split('-')
    let hora = data.substring(11,16)
    let dataHoraFormatada = formatData[2]+'/'+formatData[1]+'/'+formatData[0]+ ' as '+hora
    return dataHoraFormatada
}