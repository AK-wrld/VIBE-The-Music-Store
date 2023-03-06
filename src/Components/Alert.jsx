import React, { useContext } from 'react'
import AlertContext from '../context/ContextFiles/AlertContext'

function Alert() {
    const props = useContext(AlertContext)
  return (
   props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  {props.alert.type==='success'?'Success':'Failure'}: {props.alert.message} 
  {/* initially it will show error as we set alert to null and we cannot read property of null
        however if we write an if statement that if props.alert!=null then it will solve the problem
        rather than if we can use an alternate syntax: props.alert &&. */}
</div>
  )
}

export default Alert
