import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class MerchantTile extends Component {
    render() {
        return (
            <Link className="shop__content" to={`/inventory/${this.props.merchant.name}`}>
                <div className="shop__content__text">{this.props.merchant.name}</div>
                <div className="shop__content__text">Vendor money: <i className="fas fa-yen-sign">{this.props.merchant.gils}</i></div>
                <div className="shop__content__text">Enter</div>
                <i className="fas fa-dungeon shop__content__text shop__content__icon"/>
            </Link>
        )
    }
}

