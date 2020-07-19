import React, { Component } from "react";
import SrcContract from "./contracts/LuckyGun.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '0.1',
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      message: '',
      loading: false,
      owner: '',
      isOwner: false
    };
  }


  componentDidMount = async () => {
    
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      // const isOwner = owner === account ? true : false;

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SrcContract.networks[networkId];
      const contract = new web3.eth.Contract(
        SrcContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: contract }, this.runExample);
      // this.setState({ web3, accounts, contract: contract });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {

    const { accounts, amount, contract, web3 } = this.state;
    
    try {
      this.setState({ message: '参与抽奖中，请稍后...', loading: true });

      await contract.methods.bet().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether'),
      });

      this.setState({ message: '参与成功！', loading: false });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (err) {
      console.error(err);
      this.setState({ message: err.message || err.toString(), loading: false });
    }

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { message } = this.state;
    return (
      <div className="App">
        <h3 className="message">{message}</h3>
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
