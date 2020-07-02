const Web3 = require("web3");
//console.log(Web3);

const rpcUrl = "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108";

let web3 = new Web3(rpcUrl);

//console.log("new web 3 instance " + web);

let account1 = "0xC0847D13b14E9dc83FCa69fD17f066d873035bEd";
let account2 = "0x6556e03faE63AB57f1f9b11b448755798AeDAd06";

//console.log(web.eth.getBalance(address));

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
