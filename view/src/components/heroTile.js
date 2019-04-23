import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class HeroTile extends Component {
    render() {
        return (
            <Link className="shop__content" to="/inventory/Hero">
                <div className="shop__content__text">My money: <i className="fas fa-yen-sign">{this.props.hero.gils}</i></div>
                <div className="shop__content__text">Check my backpack</div>
                <i className="fas fa-box-open shop__content__text shop__content__icon"/>
            </Link>
        )
    }
}

