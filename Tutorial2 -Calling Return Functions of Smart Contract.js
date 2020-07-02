const Web3 = require("web3");
//console.log(Web3);

const rpcUrl = "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108";

let web = new Web3(rpcUrl);

//console.log("new web 3 instance " + web);

let abi = [
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
  }
];

const address1 = "0x1c091a6fa3ed1d51285d0a9df5b7c2004ee33c7a";

const contract = new web.eth.Contract(abi, address1);

//console.log(contract.methods.setAge + " This is my Contract");

contract.methods.getAge().call(function(err, result) {
  console.log("This is my age ", result);
});
