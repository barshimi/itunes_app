'use strict'

import React from 'react'
import classes from 'styles/statusHeader.scss'

export default class StatusHeader extends React.Component {
  static propTypes = {
    roundNumber: React.PropTypes.number
  }

  /**
   * set balls class acording to round number
   * @param  {int} roundNumber
   * @param  {int} pos (ball position)
   * @return {string} element class
   */
  statusClasses = (roundNumber, pos) => {
    let mainStyle = classes['status_ball']
    let lastBall = classes['last_ball']
    if (pos === 0) return `${mainStyle} ${classes['status_ball_on']}`
    let style = roundNumber > pos ? `${mainStyle} ${classes['status_ball_on']}` : mainStyle
    return pos === 4 ? `${style} ${lastBall}` : style
  }

  render () {
    const {roundNumber} = this.props
    let ballsHtml = Array(5).fill(0).map((e, i) => i).map((i) => {
      return (<span className={this.statusClasses(roundNumber, i)} key={i}>{i + 1}</span>)
    })

    return (
      <div className={classes['status_header']}>
        {ballsHtml}
      </div>
    )
  }
}
