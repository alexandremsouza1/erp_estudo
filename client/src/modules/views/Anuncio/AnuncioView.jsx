import React from "react";

import TableList from './TableList'

export default function AnuncioView(props) {
  document.title = "Anúncios"
  return (
    <TableList title="Meus Anúncios" result={props.state.result} {...props}></TableList>
  )
}


