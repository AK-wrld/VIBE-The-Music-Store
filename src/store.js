import {  legacy_createStore } from 'redux'
import Reducer from './reducer/RandomReducer'


const store = legacy_createStore(Reducer)

store.subscribe((state) => console.log(store.getState()))
export default store