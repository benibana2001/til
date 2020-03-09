import { combineReducers} from 'redux'
import CardListReducer from './CardList'

export default combineReducers({
    cardList: CardListReducer
})