import { Injectable } from '@angular/core';
import {
  RequestNetwork,
  Types,
  Utils,
} from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { providers } from 'ethers';
import { MetamaskService } from './metamask.service';
import { payRequest } from '@requestnetwork/payment-processor';
import { getTheGraphClient } from '@requestnetwork/payment-detection';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requestClient?: RequestNetwork;
  provider: any;
  web3SignatureProvider: any;

  constructor(private metamaskService: MetamaskService) {
    this.provider = this.metamaskService.getProvider();
    this.web3SignatureProvider = new Web3SignatureProvider(this.provider);
    this.requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: 'https://gnosis.gateway.request.network',
      },
      signatureProvider: this.web3SignatureProvider,
      paymentOptions: {
        getSubgraphClient: (chainId: string) => {
          return getTheGraphClient(
            'mantle',
            'https://subgraph-api.mantle.xyz/api/public/555176e7-c1f4-49f9-9180-f2f03538b039/subgraphs/requestnetwork/request-payments-mantle/v0.1.0/gn'
          );
        },
      },
    });
  }

  async requestPayment(
    payeeIdentity: string,
    amount: number,
    payerIdentity?: string,
    dueDate?: string
  ) {
    const paymentRecipient = payeeIdentity;
    const feeRecipient = '0x0000000000000000000000000000000000000000';

    const request = await this.requestClient?.createRequest({
      requestInfo: {
        currency: {
          type: Types.RequestLogic.CURRENCY.ETH,
          network: 'mantle',
          value: 'ETH',
        },
        expectedAmount: Math.round(amount * Math.pow(10, 18)), //0.000005

        // The payee identity. Not necessarily the same as the payment recipient.
        payee: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payeeIdentity,
        },

        // The payer identity. If omitted, any identity can pay the request.
        payer: payerIdentity
          ? {
              type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
              value: payerIdentity,
            }
          : undefined,

        // The request creation timestamp.
        timestamp: Utils.getCurrentTimestampInSecond(),
      },

      // The paymentNetwork is the method of payment and related details.
      paymentNetwork: {
        id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
        parameters: {
          paymentNetworkName: 'mantle',
          paymentAddress: payeeIdentity,
          feeAddress: feeRecipient,
          feeAmount: '0',
        },
      },

      // The contentData can contain anything.
      // Consider using rnf_invoice format from @requestnetwork/data-format
      contentData: {
        reason: 'For no reason',
        dueDate: dueDate ? dueDate : '2025.09.16',
      },

      // The identity that signs the request, either payee or payer identity.
      signer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
    });
    const confirmedRequestData = await request?.waitForConfirmation();
    return confirmedRequestData;
    // request?.then((req) => {
    //   const confirmedRequestData = req.waitForConfirmation();
    //   console.log(`Request prepared ${JSON.stringify(req)}`);
    //   confirmedRequestData.then((data) => {
    //     console.log(`Data received ${JSON.stringify(data)}`);
    //   });
    // });
  }

  async pay(requestData: string) {
    // const payerWallet = new Wallet(process.env.PRIVATE_KEY_1, provider);
    console.log('Paying');
    const paymentTx = await payRequest(
      JSON.parse(requestData),
      await new providers.Web3Provider((window as any).ethereum).getSigner()
    );
    await paymentTx.wait(2);
  }

  parseUnits(value: string, decimals: number) {
    let [integer, fraction = '0'] = value.split('.');

    const negative = integer.startsWith('-');
    if (negative) integer = integer.slice(1);

    // trim leading zeros.
    fraction = fraction.replace(/(0+)$/, '');

    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
      if (Math.round(Number(`.${fraction}`)) === 1)
        integer = `${BigInt(integer) + 1n}`;
      fraction = '';
    } else if (fraction.length > decimals) {
      const [left, unit, right] = [
        fraction.slice(0, decimals - 1),
        fraction.slice(decimals - 1, decimals),
        fraction.slice(decimals),
      ];

      const rounded = Math.round(Number(`${unit}.${right}`));
      if (rounded > 9)
        fraction = `${BigInt(left) + BigInt(1)}0`.padStart(
          left.length + 1,
          '0'
        );
      else fraction = `${left}${rounded}`;

      if (fraction.length > decimals) {
        fraction = fraction.slice(1);
        integer = `${BigInt(integer) + 1n}`;
      }

      fraction = fraction.slice(0, decimals);
    } else {
      fraction = fraction.padEnd(decimals, '0');
    }

    return BigInt(`${negative ? '-' : ''}${integer}${fraction}`);
  }
}
