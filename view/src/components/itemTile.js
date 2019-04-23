import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {connect} from 'react-redux'
import {updateHeroWallet, updateMerchantWallet} from '../actions'
import { TRANSACTION_MUTATION } from '../gql_queries'

class ItemTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            maxQuantity: this.props.itemSlot.quantity,
            item: this.props.itemSlot.item,
            buyerName: this.props.buyerName,
            sellerName: this.props.sellerName
        };
        this.onChange = this.onChange.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.removeQuantity = this.removeQuantity.bind(this);
    }

    onChange(event) {
        this.setState({
            quantity: event.target.value
        })
    }

    addQuantity() {
        this.setState({
            quantity: this.state.quantity + 1
        })
    }

    removeQuantity() {
        this.setState({
            quantity: this.state.quantity - 1
        })
    }

    render() {
        let itemDescription
        if (this.state.item.type === "MISC") itemDescription = <div className="item__info__label">{this.state.item.description}</div>
        if (this.state.item.type === "WEAPON") itemDescription = <div className="item__info__label">Atk: {this.state.item.atk} Dmg: {this.state.item.dmg} Mag: {this.state.item.mag}</div>
        if (this.state.item.type === "ARMOR") itemDescription = <div className="item__info__label">Def: {this.state.item.def} MDef: {this.state.item.MDef} HP: {this.state.item.HP}</div>

        return (
            <div className="item">
                <div className="item__info">
                    <div className="item__info__label">{this.state.item.name}</div>
                    {itemDescription}
                </div>
                <div className="item__price">
                    <div className="item__price__label"><i className="fas fa-yen-sign"/>{this.state.item.price}</div>
                    <div className="item__price__label">{this.state.maxQuantity} item left</div>
                </div>
                <div className="item__purchase">
                    <div className="stepperInput">
                        <button className="button button--addOnLeft" onClick={this.removeQuantity}>-</button>
                        <div className="input stepperInput__input">{this.state.quantity}</div>
                        <button className="button button--addOnRight" onClick={this.addQuantity}>+</button>
                    </div>
                    <Mutation mutation={TRANSACTION_MUTATION}>
                        {(buyItems) => {
                            const onClick = () => {
                                buyItems({
                                    variables: {
                                        buyerName: this.state.buyerName,
                                        sellerName: this.state.sellerName,
                                        itemName: this.state.item.name,
                                        quantity: this.state.quantity
                                    }
                                })
                                    .then(({ data }) => {
                                        this.setState({
                                            ...this.state,
                                            maxQuantity: data.itemTransaction.inventorySlot.length === 0 ? 0 : data.itemTransaction.inventorySlot[0].quantity
                                        })

                                        if (this.state.buyerName === 'Hero') {
                                            this.props.updateHeroWallet(data.itemTransaction.buyerMoney)
                                            this.props.updateMerchantWallet(data.itemTransaction.sellerMoney)
                                        } else {
                                            this.props.updateHeroWallet(data.itemTransaction.sellerMoney)
                                            this.props.updateMerchantWallet(data.itemTransaction.buyerMoney)
                                        }
                                    })
                            }

                            return <button className="button register" onClick={onClick}><i className="fas fa-cash-register" /></button>
                        }}
                    </Mutation>
                </div>
            </div>

        );
    }
}

export default connect(null, {updateHeroWallet, updateMerchantWallet})(ItemTile)