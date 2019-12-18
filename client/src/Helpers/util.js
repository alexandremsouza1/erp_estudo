
export default function formatarDataHora(date){
    let formatData = date.substring(0,10).split('-')
    let hora = date.substring(11,16)
    let dataHoraFormatada = formatData[2]+'/'+formatData[1]+'/'+formatData[0]+ ' as '+hora
    return dataHoraFormatada
}