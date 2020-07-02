var Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108"
);

const account1 = "0xC0847D13b14E9dc83FCa69fD17f066d873035bEd";

let abi = [
  {
    inputs: [],
    name: "doSomeWork",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    name: "logString",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256"
      }
    ],
    name: "setAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const account2 = "0x1c091a6fa3ed1d51285d0a9df5b7c2004ee33c7a";
const Private_Key_1 = Buffer.from(
  "01EF34E359D08E81A228935EA51E4A56477ACD6E8BD6E12405F85F684247A48D",
  "hex"
);

const contract = new web3.eth.Contract(abi, account2);

data = contract.methods.setAge(12).encodeABI();

//console.log(web3.eth.accounts.create());
/*
web3.eth.getBalance(account1, (err, _balance) => {
  if (err) {
    console.log("Error Has occured");
  } else {
    console.log("Account# 1 balance ", web3.utils.fromWei(_balance, "ether"));
  }
});

web3.eth.getBalance(account2, (err, _balance) => {
  if (err) {
    console.log("Error Has occured");
  } else {
    console.log("Account# 2 balance ", web3.utils.fromWei(_balance, "ether"));
  }
});
*/

web3.eth.getTransactionCount(account1, (err, _count) => {
  //build the transaction
  const txObject = {
    nonce: web3.utils.toHex(_count),
    to: account2,
    data: data,
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
  };

  //console.log(txObject);

  //sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(Private_Key_1);

  const serialTransaction = tx.serialize();
  const raw = "0x" + serialTransaction.toString("hex");

  //brodcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("txHash:", txHash);
    }
  });
});

contract.methods.getAge().call(function(err, result) {
  if (err) {
    console.log(err.message);
  }
  console.log("This is my age ", result);
});
