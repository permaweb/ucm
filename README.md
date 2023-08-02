# Universal Content Marketplace (UCM) Contract

## Overview

The Universal Content Marketplace (UCM) is a revolutionary protocol built on the permaweb, specifically designed to enable trustless exchange of atomic assets. It empowers creators and users alike to interact, trade, and transact with any form of digital content, from images and music to videos, papers, components, and even applications.

## Features

* Trustless Exchange: UCM provides a decentralized infrastructure that eliminates the need for intermediaries or central authorities. Users can securely exchange atomic assets on the permaweb with full control and ownership over their content.

* Permanent Storage: Leveraging the permaweb technology of Arweave, UCM ensures the permanence of content. No more worries about data loss or removal, as assets stored on the permaweb remain accessible and verifiable forever.

* Open Protocol: UCM is an open protocol, allowing developers and creators to integrate and build on top of it. The protocol is designed to be extensible, providing opportunities for future innovation and interoperability.

* SmartWeave Integration: UCM leverages the SmartWeave contract system on Arweave, enabling seamless execution of the protocol's functionalities. SmartWeave ensures the trust and transparency of transactions while minimizing the need for additional development.

## Getting Started

To use the Universal Content Marketplace, follow these steps:

Install the required dependencies.
1. Deploy the UCM SmartWeave contract on the Arweave network.
2. Integrate the UCM protocol into your application using the provided API documentation.
3. Customize and configure the marketplace to meet your specific needs.
4. Enable users to trade and interact with atomic assets on the permaweb using the UCM protocol.

## Developers

``` sh
yarn
yarn test
yarn build
yarn deploy
```

## Documentation

Detailed documentation for the Universal Content Marketplace is available on the [wiki](https://ucm-wiki.g8way.io). It includes information on installation, contract deployment, API usage, and customization options. Please refer to the documentation for comprehensive instructions on utilizing the UCM protocol effectively.

## Contributing

We welcome contributions from the community to enhance and improve the Universal Content Marketplace. If you have any ideas, bug reports, or feature requests, please submit them via the issue tracker. We appreciate your support in making UCM even better!


## License

The Universal Content Marketplace is released under the [UDL License](https://zempq24srrznl75y5gffqikjei4zr4bxrfzowfmtv6d4zoem73pq.arweave.net/yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8#h.58w8zd209d81). You are free to use, modify, and distribute the protocol, subject to the terms and conditions outlined in the license.

## Contact

If you have any questions, suggestions, or inquiries regarding the Universal Content Marketplace, please contact us at [wiki](https://ucm-wiki.g8way.io) We're excited to hear from you!



----

Notes:


## How does it work?

### Initialize the swap pair by calling `addPair`

```js
await write(ORDERBOOK_CONTRACT, { function: 'addPair', pair: [ASSET, TOKEN]})
```

The addPair function sets up the ability to trade an asset for a token. This only needs to be called one time.

## Sell a digital asset

### Allow 

Seller of the asset needs to allow the orderbook to claim the quantity of tokens they want to sell.

```js
const { originalTxId } = await write(ASSET_CONTRACT, { function: 'allow', target: ORDERBOOK_CONTRACT, qty: 10000 })
```

### CreateOrder

Seller now needs to call the orderbook to create their sells order

```js
await write(ORDERBOOK_CONTRACT, { function: 'createOrder', transaction: originalTxId, qty: 1000, price: 1})
```

## Buy a digital asset with U

Buyer needs to allow the orderbook to claim the quantity of the tokens they would like to use to purchase the asset.

```js
const { originalTxId } = await write(TOKEN_CONTRACT, { function: 'allow', target: ORDERBOOK_CONTRACT, qty : 1000 })
```

### CreateOrder

Buy needs to complete the purchase by calling createOrder on the orderbook contract

```js
await write(ORDERBOOK_CONTRACT, { function: 'createOrder', transaction: originalTxId, qty: 1000, max: 1000 })
```

---

You should also be able to reverse these flows, so a buyer could make an offer to buy x amount of an asset for y amount of U Tokens. And the seller could accept the offer and basically reverse the flow.

---

If for some reason the seller gets cold feet, they can cancel the order.

```js
await write(ORDERBOOK_CONTRACT, { function: 'cancelOrder', orderID: ORDERID })
```
