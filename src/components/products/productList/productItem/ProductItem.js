import React, {Component, PropTypes} from 'react'
import styles from './productItem.css'

export default class ProductItem extends Component {
	render() {
		const { product, popup } = this.props
		return <tr>
			<td>{product.name}</td>
			<td>{product.protein}</td>
			<td>{product.fat}</td>
			<td>{product.ch}</td>
			<td>{product.caloricity}</td>
			<td>
				<a href="javascript:void(0)" onClick={() => popup('edit_product', product)}>
			  	<span className={styles.link_pencil}></span>
			  </a>
			  <a href="javascript:void(0)" onClick={() => popup("remove_product", product._id)}>
			  	<span className={styles.link_delete}></span>
			  </a>
			</td>
		</tr>
	}

	showEditForm() {
		this.setState({ editable: true })
	}

	cancelEditProduct() {
		var fields = ['name', 'protein', 'fat', 'ch', 'caloricity']

    fields.forEach(field => {
      this.refs[field].value = this.props.product[field]
    })

    this.setState({ editable: false})
	}


	changeProduct(e) {
		e.preventDefault()

		const fields = ['name', 'protein', 'fat', 'ch', 'caloricity']
		const oldProduct = this.props.product
		var newProduct = {}
		var productDiff = {}
		var needUpdate = false

		fields.forEach(field => {
			const newValue = this.refs[field].value + ""
			const oldValue = this.props.product[field] + ""

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
			this.props.change(newProduct, productDiff)
		}

		this.setState({ editable: false })
	}


	calculateCaloricity() {
    var caloricity = (
      ((parseInt(this.refs.protein.value) || 0) * 4 +  
      (parseInt(this.refs.fat.value) || 0) * 9 +  
      (parseInt(this.refs.ch.value) || 0) * 4) 
    )
    
    this.refs.caloricity.value = caloricity
  }
}
