# truffle-react

`npm install -g truffle`
`npm install -g ethereumjs-testrpc`

[Truffle文档 - 快速入门 Truffle](https://learnblockchain.cn/docs/truffle/quickstart.html)

Truffle 提供了一個內置的個人模擬區塊鏈

`truffle develop`  

顯示了10個賬號，和他們給你的私鑰，這些賬號可以用來和區塊鏈進行交互

以直接輸入`compile` 來執行truffle compile，以及直接輸入 migrate 來部署`編譯的智能合約到區塊鏈`（相當於truffle migrate）


## truffle react

[truffle unbox react](https://www.trufflesuite.com/boxes/react)


`truffle compile`  
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to D:\Jacob\github\truffle-react\client\src\contracts

`truffle migrate`  

===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to \github\truffle-react\client\src\contracts

```sh
// in another terminal (i.e. not in the truffle develop prompt)
cd client
npm run start
```

## truffle test

[Checking events when testing Solidity smart contracts with Truffle](https://kalis.me/check-events-solidity-smart-contract-test-truffle/)