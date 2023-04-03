import React, {useState} from 'react'

import NavbarContext from '../ContextFiles/NavbarContext'

const NavbarState = (props)=> {
   //make global props and global states here 
   const [results,setResults] = useState([])
   const [navInp,setNavInp] = useState('')
   const [songObj,setSongObj] = useState({})
   
   async function filter() {
    // console.log("test")
    
        let url = `https://itunes.apple.com/search?term=${navInp}&entity=song&limit=10`
        let data = await fetch(url)
        let parsedData = await data.json()
        
        setResults(parsedData.results)
    
}
    return (
        <NavbarContext.Provider value={{results,setResults,filter,navInp,setNavInp,songObj,setSongObj}}>
           
            {props.children}
        </NavbarContext.Provider>
    )
    }
export default NavbarState 