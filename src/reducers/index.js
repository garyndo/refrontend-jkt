import { combineReducers } from 'redux'
import { productReducer } from './productReducer'

const allReducer = combineReducers({
    product: productReducer
})

export default allReducer