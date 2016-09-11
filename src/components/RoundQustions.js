'use strict'

import React from 'react'
import StatusHeader from 'components/StatusHeader'
import ScoreComponent from 'components/ScoreComponent'
import GuessForm from 'components/GuessForm'
import {pointHash, maxRoundState} from '../utils/constants'
import classes from 'styles/roundQuestions.scss'

export default class RoundQustions extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    roundList: React.PropTypes.array,
    roundNumber: React.PropTypes.number,
    roundState: React.PropTypes.number,
    userScore: React.PropTypes.number,
    chosenArtist: React.PropTypes.string
  }

  /**
   * create list of html object questions
   * @param  {int} roundState
   * @return {object} jsx object
   */
  SetQustionsBox = (roundState) => {
    return this.props.roundList.map((q, index) => {
      if (index + 1 > roundState) return
      return (
        <span className={classes['qustion']} key={index}>
          {`- ${q.name}`}
        </span>
      )
    })
  }

  /**
   * on input submit (user guessed artist), change global state of rounds, score, round state
   * @param  {string} userGuess
   */
  submitGuess = (userGuess) => {
    if (this.props.chosenArtist === userGuess) {
      this.props.actions.updateUserScore(pointHash[this.props.roundState.toString()])
      this.props.actions.updateRoundNumber()
      this.props.actions.updateRoundState('success')
    } else {
      this.props.actions.updateRoundState()
      if (this.props.roundState === maxRoundState) this.props.actions.updateRoundNumber()
    }
  }

  render () {
    const {roundNumber, roundState, roundList, userScore} = this.props
    let QustionsBox = this.SetQustionsBox(roundState)
    let hintImgSrc = roundState > maxRoundState - 1 ? roundList[2].img : ''
    let points = roundState > 0 ? pointHash[roundState.toString()] : ''
    return (
      <div className={classes['round_Q_wrapper']}>
        <StatusHeader roundNumber={roundNumber} />
        <div className={`clearfix ${classes['questions_wrapper']}`}>
          <div className={classes['qustions_box']}>
            {QustionsBox}
          </div>
          <GuessForm
            submitGuess={this.submitGuess}
            hintImg={hintImgSrc}
            pointTxt={points.toString()} />
        </div>
        <ScoreComponent userScore={userScore} />
      </div>
    )
  }
}
