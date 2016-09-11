'use strict'

import React from 'react'
import classes from 'styles/guessForm.scss'

export default class GuessForm extends React.Component {
  static propTypes = {
    submitGuess: React.PropTypes.func,
    hintImg: React.PropTypes.string,
    pointTxt: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      userGuess: ''
    }
  }

  /**
   * handle input change. set state to new input
   * @param  {object} event
   */
  handleChange = (event) => {
    this.setState({
      userGuess: event.target.value
    })
  }

  /**
   * on submit click, user choice move to parent component and state being restart
   */
  submitArtist = () => {
    if (!this.state.userGuess.length) return

    let artistName = this.state.userGuess.toLowerCase().replace(/ /g, '+')
    this.props.submitGuess(artistName)
    this.setState({
      userGuess: ''
    })
  }

  render () {
    const {pointTxt, hintImg} = this.props
    const {userGuess} = this.state
    let imgHtml = hintImg.length ? (
      <div className={classes['hint_box']}>
        <span className={classes['hint_txt']}>hint</span>
        <img src={hintImg} className={classes['hint_img']} />
      </div>) : null
    return (
      <div className={classes['guess_form_wrapper']}>
        <span className={classes['guess_title']}>{`for ${pointTxt} points, who's the artist (enter full name)`}</span>
        <input
          type='text'
          value={userGuess}
          placeholder='Artist Name'
          onChange={this.handleChange}
          className={classes['guess_input']} />
        <button onClick={this.submitArtist} className={classes['guess_btn']}>guess the artist</button>
        {imgHtml}
      </div>
    )
  }
}
