var Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108"
);

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

const account1 = "0x6556e03faE63AB57f1f9b11b448755798AeDAd06";

const privateKey1 = Buffer.from(
  "765143AE9E78BB3E4FFB365EC0B68517EC196EAF2BF8E77B79226CDFC1B55B22",
  "hex"
);

const accountContract = "0x1c091a6fa3ed1d51285d0a9df5b7c2004ee33c7a";

const contract = new web3.eth.Contract(abi, accountContract);

data = contract.methods.doSomeWork().encodeABI();
web3.eth.getTransactionCount(account1, (err, _count) => {
  //build the transaction
  const txObject = {
    nonce: web3.utils.toHex(_count),
    to: accountContract,
    data: data,
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
  };

  //console.log(txObject);

  //sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

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

contract.getPastEvents(
  "logString",
  {
    fromBlock: 8213818,
    toBlock: "latest"
  },
  (err, events) => {
    console.log(events.length);
  }
);
