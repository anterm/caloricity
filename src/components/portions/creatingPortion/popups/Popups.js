import React, { Component } from 'react'
import styles from './popup.css'

import Spinner from '../../../helpers/spinners/bounce3'

export default class Popups extends Component {
	state = {
		checkedTime: true,
		status: null
	};

	render() {
		const { popup } = this.props
		const wrapper = popup.name === 'hide' ? "hidden" : styles.wrapper

		return <div id="popup" className={wrapper} onClick={this.closePopup}>
			{this.renderPopup()}
			{this.renderProductDataList()}
			{this.renderProductNamesDataList()}
		</div>
	}

	renderProductDataList() {
		return <datalist onChange={this.onChangeDatalist} id="products">
			{this.props.products.value.map(product => {
				const { name, protein, fat, ch, _id } = product
				const label = `${protein} белка | ${fat} жира | ${ch} углев.`
				return <option label={label} value={name} key={_id} />
			})}
		</datalist>
	}
	
	renderProductNamesDataList() {
		return <datalist id="productNames">
			{this.props.products.value.map(({name, _id}) => {
				return <option value={name} key={_id} />
			})}
		</datalist>
	}
	
	
	renderPopup() {
		const { popup, popupAction } = this.props

		switch(popup.name) {
			case 'new_portion': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Создание порции</span>
					</div>
					<div className={styles.checkbox_block}>
				  	<label>
				  		<input type='checkbox' ref="checkedTime" checked={this.state.checkedTime} onChange={this.checkedTime} /> 
				  		<span>Использовать текущее время</span>
				  	</label>
				  </div>
					<div className={styles.item}>
				  	<span className={styles.label}>Время</span>
				  	<input type='text' ref="time" defaultValue={this.getTime()} />
				  </div>
					{this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						: <div className={styles.footer}>
								<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
								<button className={styles.button_success} onClick={(e) => this.newPortion(e)}>Готово</button>
							</div>
					}
				</div>
			}

			case 'remove_portion': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Удаление порции</span>
					</div>
					<div className={styles.caution}>Вы действительно хотите удалить порцию?</div>
					{this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						: <div className={styles.footer}>
								<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
								<button className={styles.button_success} onClick={this.removePortion}>Удалить</button>
							</div>
					}
				</div>
			}

			case 'new_product': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Создание продукта</span>
					</div>
					<div className={styles.item}>
				  	<span className={styles.label}>Продукт</span>
				  	<input type='text' list="products" onChange={this.onChangeProduct} ref='name'/>
				  </div>
				  <div className={styles.item}>
				  	<span className={styles.label}>Вес</span>
          	<input type='text' ref='weight' onChange={this.calculateCaloricity}/>
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
					
					{this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						: <div className={styles.footer}>
								<button className={styles.button_change} onClick={this.newPortionProduct}>Готово</button>
							</div>
					}
				</div>
			}

			case 'edit_product': {
				const { product } = popup.data
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Изменение продукта</span>
					</div>
					<div className={styles.item}>
				  	<span className={styles.label}>Продукт</span>
				  	<input type='text' list="productNames" ref='name' defaultValue={product.name} />
				  </div>
				  <div className={styles.item}>
				  	<span className={styles.label}>Вес</span>
          	<input type='text' ref='weight' defaultValue={product.weight} onChange={this.calculateCaloricity}/>
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
          {this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						: <div className={styles.footer}>
          			<button className={styles.button_change} onClick={this.changePortionProduct}>Сохранить</button>
		          </div>
						}
				</div>
			}

			case 'remove_product': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Удаление продукта</span>
					</div>
					<div className={styles.caution}>Вы действительно хотите удалить продукт?</div>
					{this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
          	: <div className={styles.footer}>
								<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
								<button className={styles.button_success} onClick={this.removePortionProduct}>Удалить</button>
							</div>
					}
				</div>
			}
			
			case 'another_new_product?': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Вопрос</span>
					</div>
					<div className={styles.caution}>Продукт <b>{popup.data.product}</b> успешно добавлен.</div>
          {this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						:	<div className={styles.footer}>
								<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
								<button className={styles.button_success} onClick={() => popupAction('new_product', popup.data.portionId)}>Добавить ещё</button>
							</div>
					}
				</div>
			}
			
			case 'add_product_to_products?': {
				return <div className={styles.main}>
					<div className={styles.title}>
						<span className={styles.close_icon} onClick={() => popupAction('hide')}></span>
						<span className={styles.title_text}>Вопрос</span>
					</div>
					<div className={styles.caution}>
						Продукт <b>{popup.data.product.name}</b> успешно добавлен, но отсутствует в вашем списке продуктов.
						<div>Хотите добавить?</div>
					</div>
          {this.state.status === 'pending'
						? <div className={styles.spinner}><Spinner /></div>
						:	<div className={styles.footer}>
								<button className={styles.button_cancel} onClick={() => popupAction('hide')}>Отмена</button>
								<button className={styles.button_cancel} onClick={() => popupAction('new_product', popup.data.portionId)}>Новый продукт</button>
								<button className={styles.button_success} onClick={this.newProduct}>Добавить</button>
							</div>
					}
				</div>
			}

			default: 
				return null
		}
	}


	componentDidMount() {
		if(!this.props.products.length) {
			this.props.actions.products.fetch(this.props.userId)
		}
	}


	getTime() {
		var date = new Date().toLocaleTimeString()
		return date.length == 7
			? "0" + date.substr(0, 4)
			: date.substr(0, 5)
	}	


	closePopup = (e) => {
		if(e.target.id === 'popup') {
			this.props.popupAction('hide')
		}
	};


	onChangeProduct = (e) => {
		const products = this.props.products.value
		const productName = e.target.value
		var result;
		for(let i = 0, len = products.length; i < len; ++i) {
			if(products[i].name === productName) {
				result = products[i]
				break;
			}
		}
		
		const { caloricity, protein, fat, ch } = this.refs
		if(result) {
			caloricity.value = result.caloricity
			protein.value = result.protein
			fat.value = result.fat
			ch.value = result.ch
		} else {
			caloricity.value = ""
			protein.value = ""
			fat.value = ""
			ch.value = ""
		}
	};


	newPortion(e) {
		this.setState({ status: "pending" })

		const { popup, popupAction, actions } = this.props
		const time = this.refs.time.value
		if(!time) return

		const date = new Date(popup.data + "T" + time).toISOString()

		if(date.toString() === "Invalid Date") {
			return console.log("Invalid Date")
		}

		const portion = {
			date,
			products: []
		}

		actions.dayPortions.create(portion).then(
			portion => {
				const data = {
					caloricity: 0,
					protein: 0,
					fat: 0,
					ch: 0,
					_id: this.props.date
				}
				
				popupAction('hide')
				popupAction('new_product', portion._id)
				this.setState({ status: null })
				
				// refresh the state of allPortions
				actions.allPortions.addEmptyPortion(data)
			},
			error => {
				popupAction('hide')
				this.setState({ status: null })
			}
		)
	}


	removePortion = () => {
		this.setState({ status: "pending" })

		const { popup, popupAction, actions } = this.props
		const portionId = popup.data._id
		
		actions.dayPortions.remove(portionId).then(
			() => {
				popupAction('hide')
				this.setState({ status: null })
				
				if(popup.data.products.length == 0) return {}
				// refresh the portion of allPortions
				const id = this.props.date
				const data = popup.data.products.reduce((prev, curr) => {
					prev.caloricity -= curr.caloricity,
					prev.protein -= curr.protein,
					prev.fat -= curr.fat,
					prev.ch -= curr.ch
					return prev
				}, { caloricity: 0, protein: 0, fat: 0, ch: 0 })
				
				this.props.actions.allPortions.refreshPortion(id, data)
			},
			error => {
				popupAction('hide')
				this.setState({ status: null })
			}
		)
	};
	
	newProduct = () => {
		this.setState({ status: "pending" })
		
		const { actions, userId, popup, popupAction } = this.props
		const { product, portionId } = popup.data
		
		actions.products.create(userId, product).then(
			result => {
				this.setState({ status: null })
				popupAction("new_product", portionId)
			},
			error => {
				popupAction('hide')
				this.setState({ status: null })
			}
		)
	};


	newPortionProduct = () => {
		this.setState({ status: "pending" })
		
		const product = {}
		const errors = []
		const fields = ['name', 'weight', 'protein', 'fat', 'ch', 'caloricity']

		product.name = this.refs.name.value
		if(!product.name || product.name.length < 2) 
			errors.push("Название продукта должно содержать больше 1 символа")

		product.weight = parseInt(this.refs.weight.value)
		if(isNaN(product.weight) || product.weight <= 0) 
			errors.push("Поле веса должно быть больше нуля")

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
			errors.push("Поле калорий должно быть положительным числом или нулем")

		fields.forEach(field => {
			this.refs[field].value = ""
		})

		if(errors.length) {
			this.setState({ status: null })
			return console.log("errors", errors)
		}
		
		const { products, actions, popup, popupAction, date } = this.props
		const portionId = popup.data
		
		actions.portionProducts.add(portionId, product).then(
			() => {
				this.setState({ status: null })
				actions.allPortions.refreshPortion(date, product)
				
				// Проверить, если такого продукта еще нет...
				var existsProduct = false;
				for(var i = 0, len = products.value.length; i < len; ++i) {
					if(products.value[i].name.toLowerCase() === product.name.toLowerCase()) {
						existsProduct = true
						break
					}
				}
				
				// ... тогда предолжить добавить в базу Products
				if(!existsProduct) {
					popupAction('add_product_to_products?', { product, portionId })
				} else {
					popupAction('another_new_product?', { 
						product: product.name, 
						portionId
					})
				}
				
			},
			error => {
				popupAction('hide')
				this.setState({ status: null })
			}
		)
	};


	changePortionProduct = () => {
		this.setState({ status: "pending" })

		const { popup, actions, popupAction } = this.props
		var fields = ['name', 'weight', 'protein', 'fat', 'ch', 'caloricity']
	
		const oldProduct = popup.data.product
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
			
			actions.portionProducts.change(popup.data.portionId, newProduct, productDiff).then(
				() => {
					popupAction('hide')
					this.setState({ status: null })
					
					const data = {}
					for(var name in productDiff) {
						if(productDiff.hasOwnProperty(name)) {
							data[name] = productDiff[name] - oldProduct[name]
						}
					}
					
					actions.allPortions.refreshPortion(this.props.date, data)
				},
				error => {
					popupAction('hide')
					this.setState({ status: null })
				}
			)
		} else
			popupAction('hide')
	};


	removePortionProduct = () => {
		this.setState({ status: "pending" })

		const { popup, actions, popupAction } = this.props
		const { portionId, product } = popup.data
		
		actions.portionProducts.remove(portionId, product._id).then(
			() => {
				popupAction('hide')
				this.setState({ status: null })
				
				actions.allPortions.refreshPortion(this.props.date, {
					caloricity: -product.caloricity,
					protein: -product.protein,
					fat: -product.fat,
					ch: -product.ch
				})
			},
			error => {
				popupAction('hide')
				this.setState({ status: null })
			}
		)
	};

	checkedTime = () => {
		const checkedTime = !this.state.checkedTime
		this.setState({ checkedTime })
		this.refs.time.value = checkedTime ? this.getTime() : ""
	};

	calculateCaloricity = () => {
    const caloricity = parseInt(
      ((parseInt(this.refs.protein.value) || 0) * 4 +  
      (parseInt(this.refs.fat.value) || 0) * 9 +  
      (parseInt(this.refs.ch.value) || 0) * 4) *
      (this.refs.weight.value / 100)
    )
    
    this.refs.caloricity.value = caloricity
  };
}