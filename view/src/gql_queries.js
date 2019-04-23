import gql from "graphql-tag";



export const HERO_MONEY = gql`
query {
    getHero {
        gils
    }
}`


export const MERCHANTS_QUERY = gql`
query {
    getMerchants {
        id
        type
        name
        gils
    }
}`

export const INVENTORY_QUERIES = gql`    
query Inventory($name: String!, $itemType: ItemType) {
    getUserItemsByType(name: $name, itemType: $itemType) {
        quantity
        item {
            id
            type
            name
            description
            price
            atk
            dmg
            mag
            def
            MDef
            HP
        }
    }
}`

export const TRANSACTION_MUTATION = gql`
mutation ItemTransaction($buyerName: String!, $sellerName: String!, $itemName: String!, $quantity: Int!) {
    itemTransaction(buyerName: $buyerName ,sellerName: $sellerName, itemName: $itemName, quantity: $quantity) {
        inventorySlot {
            quantity        
        }
        sellerMoney
        buyerMoney
    }
}`