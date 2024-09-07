import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  private userAddressSub = new Subject<string>();
  private userAddress?: string;
  $userAddress = this.userAddressSub.asObservable();

  private provider: any;

  constructor() {
    this.loadMetaMaskProvider();
  }

  // Load MetaMask provider
  private async loadMetaMaskProvider() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      console.log('MetaMask is available');
    } else {
      console.error('Please install MetaMask!');
    }
  }

  public getProvider() {
    return this.provider;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    return Boolean(this.provider);
  }

  // Connect to MetaMask wallet
  async connectMetaMask(): Promise<any> {
    if (!this.isMetaMaskInstalled()) {
      console.error('MetaMask is not installed');
      return null;
    }

    try {
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });
      this.userAddressSub.next(accounts[0]); // Return the first account
      this.userAddress = accounts[0];
      return this.userAddressSub;
    } catch (error) {
      console.error('User denied MetaMask connection:', error);
      return null;
    }
  }

  getUserAddress() {
    return this.userAddress;
  }
}
