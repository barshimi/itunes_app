'use strict'

import React from 'react'
import classes from 'styles/scoreComponent.scss'

export default class ScoreComponent extends React.Component {
  static propTypes = {
    userScore: React.PropTypes.number
  }

  render () {
    const {userScore} = this.props
    return (
      <div className={classes['your_score_box']}>
        <span className={classes['score_title']}>your score is</span>
        <span className={classes['your_score']}>{userScore}</span>
      </div>
    )
  }
}
