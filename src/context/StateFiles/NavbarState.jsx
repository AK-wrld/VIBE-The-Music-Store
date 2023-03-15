import React, {useState} from 'react'

import NavbarContext from '../ContextFiles/NavbarContext'

const NavbarState = (props)=> {
   //make global props and global states here 
   const [results,setResults] = useState([])
   const [navInp,setNavInp] = useState('')
   
   async function filter() {
    // console.log("test")
    
        let url = `https://itunes.apple.com/search?term=${navInp}&limit=10`
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData.results)
        setResults(parsedData.results)
    
    // ul.innerHTML=""
    // parsedData.results.map((el)=> {

    //     let li = document.createElement('li')
    //     if(el.trackName) {

    //         li.innerText=el.trackName
    //         console.log(el.trackName)
    //         ul.appendChild(li)
    //     }


    // })
}
    return (
        <NavbarContext.Provider value={{results,setResults,filter,navInp,setNavInp}}>
           
            {props.children}
        </NavbarContext.Provider>
    )
    }
export default NavbarState 