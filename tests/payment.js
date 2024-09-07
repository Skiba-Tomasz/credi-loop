(async () => {
  const {
    RequestNetwork,
    Types,
    Utils,
  } = require("@requestnetwork/request-client.js");
  const {
    EthereumPrivateKeySignatureProvider,
  } = require("@requestnetwork/epk-signature");
  const { Wallet, providers } = require("ethers");
  const { payRequest } = require("@requestnetwork/payment-processor");

  const epkSignatureProvider = new EthereumPrivateKeySignatureProvider({
    method: Types.Signature.METHOD.ECDSA,
    privateKey: process.env.PRIVATE_KEY_2,
  });

  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://gnosis.gateway.request.network",
    },
    signatureProvider: epkSignatureProvider,
  });

  const payeeIdentity = new Wallet(process.env.PRIVATE_KEY_2).address;
  const payerIdentity = new Wallet(process.env.PRIVATE_KEY_1).address;
  const paymentRecipient = payeeIdentity;
  const feeRecipient = "0x0000000000000000000000000000000000000000";

  const requestCreateParameters = {
    requestInfo: {
      currency: {
        type: Types.RequestLogic.CURRENCY.ETH,
        network: "bsc",
      },
      expectedAmount: "10000000000000", //0.00001
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payerIdentity,
      },
      timestamp: Utils.getCurrentTimestampInSecond(),
    },
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: "bsc",
        paymentAddress: paymentRecipient,
        feeAddress: feeRecipient,
        feeAmount: "0",
      },
    },
    contentData: {
      reason: "🍕",
      dueDate: "2025.06.16",
    },
    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeIdentity,
    },
  };

  const request = await requestClient.createRequest(requestCreateParameters);
  const requestData = await request.waitForConfirmation();
  console.log(JSON.stringify(requestData));

  const provider = new providers.JsonRpcProvider(
    "https://binance.llamarpc.com"
  );
  const payerWallet = new Wallet(process.env.PRIVATE_KEY_1, provider);

  const paymentTx = await payRequest(requestData, payerWallet);
  await paymentTx.wait(2);
  console.log(`Payment complete. ${paymentTx.hash}`);
})();
