import React, { useState } from 'react'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Search from '../Search/Search'

export default function Layout(props) {
  const [data, setData] = useState([])

  function handleData(newData) {

  }
  
  return (
    <div>
      {/* <Search/> */}
      <Header handleSearch={props.handleSearch} />
      <Content data={data}/>
    </div>
  )
}
