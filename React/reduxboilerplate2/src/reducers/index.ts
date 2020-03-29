import { combineReducers} from 'redux'
import CardListReducer from './CardList'
import PostsReducer from './Posts'

export default combineReducers({
    cardList: CardListReducer,
    posts: PostsReducer
})