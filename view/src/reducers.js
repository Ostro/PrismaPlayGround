import { combineReducers } from 'redux';
const defaultState = {
    buyerWallet: null,
    selelrWallet: null
}

export default combineReducers({
    wallets: (state = defaultState, action = {}) => {
        switch (action.type) {
            case 'UPDATE_HERO_WALLET':
                return {
                    ...state,
                    heroWallet: action.wallet
                }
            case 'UPDATE_MERCHANT_WALLET':
                return {
                    ...state,
                    merchantWallet: action.wallet
                }    
            default: return state
        }
    }
})