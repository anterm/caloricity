import React, {Component} from 'react'

import styles from './userStat.css'

export default class UserStat extends Component {
  render() {
    return <div className={styles.block}>
      {this.renderStat()}
    </div>
  }
  
  renderStat() {
    const { status } = this.props.data
    
    switch(status) {
      case 'fulfilled': {
        const value = this.getTotalStat()
        return <div className={styles.main}>
          <div className={styles.title}>
            <span className={styles.stat_text}>Ваша статистика за</span>
            <span className={styles.days_value}>{value.days}</span>
            <span>дней</span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Калорий</span>
            <span className={styles.value}><span>{value.caloricity}</span></span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}><span>Белков</span></span>
            <span className={styles.value}><span>{value.protein}</span></span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Жиров</span>
            <span className={styles.value}><span>{value.fat}</span></span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Углеводов</span>
            <span className={styles.value}><span>{value.ch}</span></span>
          </div>
        </div>
      }
        
      case 'rejected':
        return <div className={styles.error}>Произошла ошибка</div>
        
      default:
        null
    }
  }
  
  getTotalStat() {
    return this.props.data.value.reduce((prev, curr) => {
      prev.caloricity += curr.caloricity
      prev.protein += curr.protein
      prev.fat += curr.fat
      prev.ch += curr.ch
      prev.days += 1
      return prev
    }, { caloricity: 0, protein: 0, fat: 0, ch: 0, days: 0 })
  }
}