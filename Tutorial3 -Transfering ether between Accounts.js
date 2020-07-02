var Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108"
);

const account1 = "0xC0847D13b14E9dc83FCa69fD17f066d873035bEd";
const account2 = "0x6556e03faE63AB57f1f9b11b448755798AeDAd06";

const Private_Key_2 = Buffer.from(
  "765143AE9E78BB3E4FFB365EC0B68517EC196EAF2BF8E77B79226CDFC1B55B22",
  "hex"
);
const Private_Key_1 = Buffer.from(
  "01EF34E359D08E81A228935EA51E4A56477ACD6E8BD6E12405F85F684247A48D",
  "hex"
);

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
    value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
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
