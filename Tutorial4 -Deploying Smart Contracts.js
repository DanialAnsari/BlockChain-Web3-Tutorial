var Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/c89f216154d84b83bb9344a7d0a91108"
);

const account1 = "0x6556e03faE63AB57f1f9b11b448755798AeDAd06";

const privateKey1 = Buffer.from(
  "765143AE9E78BB3E4FFB365EC0B68517EC196EAF2BF8E77B79226CDFC1B55B22",
  "hex"
);

// Deploy the contract
web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data =
    "0x608060405234801561001057600080fd5b506102ce806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063303b51921461005157806389ea642f146100d4578063967e6e6514610157578063d5dcf12714610175575b600080fd5b6100596101a3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009957808201518184015260208101905061007e565b50505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100dc610248565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011c578082015181840152602081019050610101565b50505050905090810190601f1680156101495780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015f610285565b6040518082815260200191505060405180910390f35b6101a16004803603602081101561018b57600080fd5b810190808035906020019092919050505061028e565b005b60607f0bb563d6789cea5d754d1b7f85bfebdfe7a1a86e2e0ffccfb8a6bbdb07826ae260405180806020018281038252600f8152602001807f446f696e6720536f6d6520776f726b000000000000000000000000000000000081525060200191505060405180910390a16040518060400160405280600f81526020017f446f696e6720536f6d6520576f726b0000000000000000000000000000000000815250905090565b60606040518060400160405280600c81526020017f416d204920776f726b696e670000000000000000000000000000000000000000815250905090565b60008054905090565b806000819055505056fea2646970667358221220bbeee3ffc81948c8f1456f0da67aa6ada853b3dbd0901ce3730c71d1b83bca1b64736f6c634300060a0033";

  const dataBuffer = Buffer.from(data, "hex");

  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: data
  };

  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err, "txHash:", txHash);
    // Use this txHash to find the contract on Etherscan!
  });
});