import React, { Component } from 'react';
import { Query } from "react-apollo";
import { MerchantTile } from './merchantTile'
import { connect } from 'react-redux';
import { HeroTile } from './heroTile'
import { updateHeroWallet, updateMerchantWallet } from '../actions'
import { MERCHANTS_QUERY, HERO_MONEY } from "../gql_queries";

class Home extends Component {
    render() {
        return (
            <div>
                <h2>My inventory</h2>
                <div className="shops">
                    <div className="shop__tile">
                        <Query query={HERO_MONEY}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                this.props.updateHeroWallet(data.getHero.gils)

                                return <HeroTile hero={data.getHero} />
                            }}

                        </Query>
                    </div>
                </div>
                <h2>Merchants</h2>
                <Query query={MERCHANTS_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className="shops">
                                {data.getMerchants.map(merchant => (
                                    <div className="shop__tile" onClick={() => {
                                        console.log('allo')
                                        this.props.updateMerchantWallet(merchant.gils)
                                    }}>
                                        <MerchantTile merchant={merchant} key={merchant.id} />
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
}

export default connect(null, { updateHeroWallet, updateMerchantWallet })(Home)