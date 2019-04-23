export const updateHeroWallet = heroMoney => dispatch => {
    dispatch({
        type: 'UPDATE_HERO_WALLET',
        wallet: heroMoney
    });
};

export const updateMerchantWallet = merchantMoney => dispatch => {
    dispatch({
        type: 'UPDATE_MERCHANT_WALLET',
        wallet: merchantMoney
    });
};