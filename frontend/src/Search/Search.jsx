import React, { useState } from 'react'

export default function Search(props) {

    const [displayItem, setDisplayItem] = useState(item)

    const handleSearch = (text)=>{
        setDisplayItem(text ? item.filter(i => i.to.toLowerCase().includes(text.toLowerCase())): item)
    }

    // let {handleSearch} = props

  return (
    <div>
          <div className={styles.input}>
                <input type="text" 
                // value={}
                // onChange={}
                placeholder='Enter a name to search...' />
                <SlMagnifier />
 
            </div>
    </div>
  )
}

