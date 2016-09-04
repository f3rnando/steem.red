import React from 'react';
import {connect} from 'react-redux'
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate'
import {cleanReduxInput} from 'app/utils/ReduxForms'

class CategorySelector extends React.Component {
    static propTypes = {
        // HTML props
        id: React.PropTypes.string, // DOM id for active component (focusing, etc...)
        autoComplete: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func.isRequired,
        isEdit: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        value: React.PropTypes.string,
        tabIndex: React.PropTypes.number,

        // redux connect (overwrite in HTML)
        trending: React.PropTypes.object.isRequired, // Immutable.List
    }
    static defaultProps = {
        autoComplete: 'on',
        placeholder: 'Etiqueta (hasta 5 etiquetas), la primera etiqueta es la categoría principal.',
        id: 'CategorySelectorId',
        isEdit: false,
    }
    constructor() {
        super()
        this.state = {createCategory: true}
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategorySelector')
        this.categoryCreateToggle = e => {
            e.preventDefault()
            this.props.onChange()
            this.setState({ createCategory: !this.state.createCategory })
            setTimeout(() => this.refs.categoryRef.focus(), 300)
        }
        this.categorySelectOnChange = e => {
            e.preventDefault()
            const {value} = e.target
            const {onBlur} = this.props // call onBlur to trigger validation immediately
            if (value === 'new') {
                this.setState({createCategory: true})
                setTimeout(() => {if(onBlur) onBlur(); this.refs.categoryRef.focus()}, 300)
            } else
                this.props.onChange(e)
        }
    }
    render() {
        const {trending, tabIndex, disabled} = this.props
        const categories = trending.slice(0, 11).filterNot(c => validateCategory(c))
        const {createCategory} = this.state

        const categoryOptions = categories.map((c, idx) =>
            <option value={c} key={idx}>{c}</option>)

        const impProps = {...this.props}
        const categoryInput =
            <input type="text" {...cleanReduxInput(impProps)} ref="categoryRef" tabIndex={tabIndex} disabled={disabled} />

        const categorySelect = (
            <select {...cleanReduxInput(this.props)} onChange={this.categorySelectOnChange} ref="categoryRef" tabIndex={tabIndex} disabled={disabled}>
                <option value="">Seleccioná una etiqueta...</option>
                {categoryOptions}
                <option value="new">{this.props.placeholder}</option>
            </select>
        )
        return (
            <span>
                {createCategory ? categoryInput : categorySelect}
            </span>
        )
    }
}
export function validateCategory(category, required = true) {
    if(!category || category.trim() === '') return required ? 'Obligatorio' : null
    const cats = category.split(' ')
    return (
        // !category || category.trim() === '' ? 'Required' :
        cats.length > 5 ? 'Por favor usa solo hasta 5 categorías/etiquetas' :
        cats.find(c => c.split('-').length > 2) ? 'Solo un guión' :
        cats.find(c => c.indexOf(',') >= 0) ? 'Utilizá espacios para separar las etiquetas' :
        cats.find(c => !/^[a-z0-9-]+$/.test(c)) ? 'Usá solo minúsculas, dígitos y no más de un guión' :
        cats.find(c => !/^[a-z]/.test(c)) ? 'Debe comenzar con una letra' :
        cats.find(c => !/[a-z0-9]$/.test(c)) ? 'Debe terminar en una letra o número' :
        null
    )
}
export default connect((state, ownProps) => {
    const trending = state.global.get('category_idx').get('trending30')
    return {
        trending,
        ...ownProps,
    }
})(CategorySelector);
