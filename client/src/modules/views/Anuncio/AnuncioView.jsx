import React from "react";

import TableList from './TableList'

export default function AnuncioView(props) {
  return (
    <TableList title="Meus Anúncios" result={props.state.result} {...props}></TableList>
  )
}


