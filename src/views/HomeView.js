'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {homeActionCreators} from 'actions/home_action'
import {maxRounds} from 'utils/constants'
import {ArrangeRawList, ChooseNewArtist} from '../utils/helpers'
import RoundQustions from 'components/RoundQustions'
import ScoreComponent from 'components/ScoreComponent'
import classes from 'styles/homeView.scss'

export class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    artistAlbumList: React.PropTypes.array,
    chosenArtist: React.PropTypes.string,
    nextArtist: React.PropTypes.string,
    roundUsedArtists: React.PropTypes.array,
    roundNumber: React.PropTypes.number,
    roundState: React.PropTypes.number,
    userScore: React.PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = {
      roundList: []
    }
  }

  componentDidMount () {
    let newArtist = ChooseNewArtist(this.props.roundUsedArtists, this.props.nextArtist)
    this.props.actions.getNextArtist(newArtist)
    this.props.actions.fetchItunsAlbums(newArtist)
  }

  componentWillReceiveProps (nextProps) {
    // on initial new game or on round end set new data
    if (nextProps.roundNumber !== this.props.roundNumber && nextProps.roundNumber > 0) {
      this.setState({roundList: ArrangeRawList(nextProps.artistAlbumList)})
      nextProps.actions.usedArtistsList(nextProps.nextArtist)
      nextProps.actions.chooseCurrentArtist(nextProps.nextArtist)
    }
    // on round state 1 fetch new itunes data
    if (nextProps.roundState === 1 && nextProps.roundNumber !== this.props.roundNumber) {
      let newArtist = ChooseNewArtist(nextProps.roundUsedArtists, nextProps.nextArtist)
      nextProps.actions.getNextArtist(newArtist)
      nextProps.actions.fetchItunsAlbums(newArtist)
    }
    // set round state to 0 to get to starting point
    if (nextProps.roundNumber === 0 && this.props.roundNumber === maxRounds) {
      this.props.actions.updateRoundState('start')
      nextProps.actions.usedArtistsList('')
    }
  }

  /**
   * initiate new game
   */
  handleStartGame = () => {
    this.props.actions.updateUserScore(0)
    this.props.actions.updateRoundState()
    this.props.actions.updateRoundNumber()
    this.setState({roundList: ArrangeRawList(this.props.artistAlbumList)})
  }

  render () {
    const {roundList} = this.state
    const {actions, roundNumber, userScore, roundState, chosenArtist} = this.props
    let beginRoundHtml = (
      <div className={classes['start_game_wrapper']}>
        <h3 className={classes['start_game_title']}>* click button to start the game</h3>
        <button
          className={classes['start_game_btn']}
          onClick={this.handleStartGame}>find the artist</button>
        <ScoreComponent userScore={userScore} />
      </div>
    )

    return (
      <div className={classes['main_container']}>
        <header className={classes['header_des']}>
          <span className={classes['tikal_logo']}></span>
          <span className={classes['tikal_name']}></span>
          <span className={classes['header_title']}>guess the artist</span>
        </header>
        {roundNumber > 0 ? <RoundQustions
          actions={actions}
          roundList={roundList}
          roundNumber={roundNumber}
          roundState={roundState}
          userScore={userScore}
          chosenArtist={chosenArtist} /> : beginRoundHtml}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  artistAlbumList: state.artistAlbumList,
  artistList: state.artistList,
  chosenArtist: state.chosenArtist,
  nextArtist: state.nextArtist,
  roundUsedArtists: state.roundUsedArtists,
  roundNumber: state.roundNumber,
  roundState: state.roundState,
  userScore: state.userScore
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, homeActionCreators), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
