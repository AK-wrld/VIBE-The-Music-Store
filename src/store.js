import {  legacy_createStore } from 'redux'
import Reducer from './reducer/RandomReducer'


const store = legacy_createStore(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// store.subscribe((state) => console.log(store.getState()))
export default store