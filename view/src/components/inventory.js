import React, { Component } from 'react';
import {Query} from "react-apollo";
import {Link} from "react-router-dom";
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import ItemTile from './itemTile'
import { connect } from 'react-redux';
import {INVENTORY_QUERIES} from '../gql_queries'

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: 'All',
            transaction: 'Buy',
            buyerName: 'Hero',
            sellerName: this.props.match.params.name
        }

        this.handleChangeItemType = this.handleChangeItemType.bind(this)
        this.handleChangeTransaction = this.handleChangeTransaction.bind(this)
    }

    handleChangeItemType = (event, value) => {
        this.setState({
            ...this.state,
            itemType: value
        });
    };

    handleChangeTransaction = (event, value) => {
        this.setState({
            itemType: 'All',
            transaction: value,
            buyerName: value === 'Buy' ? 'Hero' : this.props.match.params.name,
            sellerName: value === 'Buy' ? this.props.match.params.name : 'Hero'
        });
    };

    render() {
        return (
            <div>
                <div className="inventory__info">
                    <Link className="button inventory__info__back" to="/">
                        <i className="fas fa-undo-alt"> Back </i>
                    </Link>
                    <div className="inventory__info__label">My Money: <i className="fas fa-yen-sign"/>{this.props.heroWallet}</div>
                    <div className="inventory__info__label">Merchant Money: <i className="fas fa-yen-sign"/>{this.props.merchantWallet}</div>
                </div>    
                
                <h2>Welcome to {this.state.sellerName} shop</h2>

                <Tabs value={this.state.transaction}
                      onChange={this.handleChangeTransaction}
                      centered
                >
                    <Tab label="Buy" value="Buy" />
                    <Tab label="Sell" value="Sell"/>
                </Tabs>

                <Tabs value={this.state.itemType}
                      onChange={this.handleChangeItemType}
                      centered
                >
                    <Tab icon={<i className="fas fa-boxes">All</i>} value="All" />
                    <Tab icon={<i className="fas fa-flask">Misc</i>} value="MISC"/>
                    <Tab icon={<i className="fas fa-hammer">Weapons</i>} value="WEAPON"/>
                    <Tab icon={<i className="fas fa-shield-alt">Armors</i>} value="ARMOR"/>
                </Tabs>

                <Query query={INVENTORY_QUERIES} variables={{name: this.state.sellerName, itemType: this.state.itemType === 'All' ? undefined : this.state.itemType}}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return (
                            <div className="items">
                                {
                                    data.getUserItemsByType.map(itemSlot => <ItemTile itemSlot={itemSlot} buyerName = {this.state.buyerName} sellerName={this.state.sellerName} key={itemSlot.item.id}/>)
                                }
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    heroWallet: state.wallets.heroWallet,
    merchantWallet: state.wallets.merchantWallet,
  });

export default connect(mapStateToProps, {})(Inventory)