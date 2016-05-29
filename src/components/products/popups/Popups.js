import React, { Component } from 'react'
import styles from './popup.css'


export default class Popups extends Component {
	render() {
		const { popup } = this.props
		const wrapper = popup.name === 'hide' ? "hidden" : styles.wrapper

		return <div id="popup" className={wrapper} onClick={this.closePopup}>
			{this.renderPopup()}
		</div>
	}

	closePopup = (e) => {
		if(e.target.id === 'popup') {
			this.props.popupAction('hide')
		}
	};

	renderPopup() {
		const { popup, popupAction } = this.props

		switch(popup.name) {
			case 'new_product': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Создание продукта</span>
					</div>
					<div className={styles.item}>
				  	<span className={styles.label}>Продукт</span>
				  	<input type='text' ref='name'/>
				  </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Белки</span>
          	<input type='text' ref='protein' onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Жиры</span>
          	<input type='text' ref='fat' onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Углеводы</span>
          	<input type='text' ref='ch' onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Ккал</span>
          	<input type='text' ref="caloricity"/>
          </div>
          <div className={styles.footer}>
          	<button className={styles.button_change} onClick={this.newProduct}>Готово</button>
          </div>
				</div>
			}

			case 'edit_product': {
				const product = popup.data
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Изменение продукта</span>
					</div>
					<div className={styles.item}>
				  	<span className={styles.label}>Продукт</span>
				  	<input type='text' ref='name' defaultValue={product.name} />
				  </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Белки</span>
          	<input type='text' ref='protein' defaultValue={product.protein} onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Жиры</span>
          	<input type='text' ref='fat' defaultValue={product.fat} onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Углеводы</span>
          	<input type='text' ref='ch' defaultValue={product.ch} onChange={this.calculateCaloricity}/>
          </div>
          <div className={styles.item}>
				  	<span className={styles.label}>Ккал</span>
          	<input type='text' ref="caloricity" defaultValue={product.caloricity} />
          </div>
          <div className={styles.footer}>
          	<button className={styles.button_change} onClick={this.changeProduct}>Сохранить</button>
          </div>
				</div>
			}

			case 'remove_product': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Удаление продукта</span>
					</div>
					<div className={styles.caution}>Вы действительно хотите удалить продукт?</div>
          <div className={styles.footer}>
          	<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
          	<button className={styles.button_success} onClick={this.removeProduct}>Удалить</button>
          </div>
				</div>
			}

			default: 
				return null
		}
	}

	newProduct = () => {
		var product = {}
		var errors = []
		const fields = ['name',  'protein', 'fat', 'ch', 'caloricity']

		product.name = this.refs.name.value
		if(!product.name || product.name.length < 2) 
			errors.push("Название продукта должно содержать больше 1 символа")

		product.protein = parseInt(this.refs.protein.value)
		if(isNaN(product.protein) || product.protein < 0) 
			errors.push("Поле белка должно быть положительным числом или нулем")

		product.fat = parseInt(this.refs.fat.value)
		if(isNaN(product.fat) || product.fat < 0) 
			errors.push("Поле жира должно быть положительным числом или нулем")

		product.ch = parseInt(this.refs.ch.value)
		if(isNaN(product.ch) || product.ch < 0) 
			errors.push("Поле углеводов должно быть положительным числом или нулем")

		product.caloricity = parseInt(this.refs.caloricity.value)
		if(isNaN(product.caloricity) || product.caloricity < 0) 
			errors.push("Поле калорийности должно быть положительным числом или нулем")

		fields.forEach(field => {
			this.refs[field].value = ""
		})

		if(errors.length) {
			return console.log("errors", errors)
		}

		this.props.actions.create(this.props.userId, product).then(() => {
			this.props.popupAction('hide')
		})
	};


	changeProduct = () => {
		const { popup, userId, actions, popupAction } = this.props
		var fields = ['name', 'protein', 'fat', 'ch', 'caloricity']
	
		const oldProduct = popup.data
		var newProduct = {}
		var productDiff = {}
		var needUpdate = false

		fields.forEach(field => {
			var newValue = this.refs[field].value
			var oldValue = oldProduct[field]

			if(field !== 'name') {
				newValue = parseInt(newValue)
				oldValue = parseInt(oldValue)
			}


			if(newValue === oldValue)
				return

			needUpdate = true
			productDiff[field] = newValue
		})


		if(needUpdate) {
			for(var name in oldProduct) {
				newProduct[name] = !productDiff.hasOwnProperty(name)
					? oldProduct[name]
					: productDiff[name]
			}
			
			actions.change(userId, newProduct, productDiff)
		}

		popupAction('hide')
	};


	removeProduct = () => {
		const { popup, userId, actions, popupAction } = this.props

		actions.remove(userId, popup.data).then(() => {
			popupAction("hide")
		})
	};


	calculateCaloricity = () => {
    const caloricity = parseInt(
      ((parseInt(this.refs.protein.value) || 0) * 4 +  
      (parseInt(this.refs.fat.value) || 0) * 9 +  
      (parseInt(this.refs.ch.value) || 0) * 4)
    )
    
    this.refs.caloricity.value = caloricity
  };
}
