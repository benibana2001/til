import CardList from '../components/CardList'
import { connect } from 'react-redux'
import { AppState } from '../store'

const mapStateToProps = (state: AppState) => ({
    // cards: state.CardList.cards
    cards: state.cardList.cards
})

export default connect(mapStateToProps)(CardList)