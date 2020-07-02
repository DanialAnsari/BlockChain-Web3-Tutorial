const Web3 = require("web3");
//console.log(Web3);

const rpcUrl = "HTTP://127.0.0.1:7545";

let web = new Web3(rpcUrl);

//console.log("new web 3 instance " + web);

let address = "0x3fad61CE76dC9453eE3829C8Be5c9B6974940a09";

//console.log(web.eth.getBalance(address));

web.eth.getBalance(address, (err, wei) => {
  if (err) {
    console.log("Error Recieved");
  } else {
    console.log("Wei", wei);
    var balance = web.utils.fromWei(wei, "ether");
    console.log(balance);
  }
});

const abi = [
  {
    constant: true,
    inputs: [],
    name: "getAccountStatus",
    outputs: [
      {
        internalType: "enum enmeration.status",
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "getApprovedStatus",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "inActiveAccount",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "enum enmeration.status",
        name: "_status",
        type: "uint8"
      }
    ],
    name: "setAccountStatus",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const address1 = "0x7ee7e6c5f27aB5C831a2d2706b5bB408cb02667b";

const contract = new web.eth.Contract(abi, address1);

contract.methods.getAccountStatus().call((err, result) => {
  console.log(result);
});
