import { Injectable } from "@nestjs/common";
import Web3 from "web3";

import * as contractConfig from "./TwoFactorAuth.json";

@Injectable()
export class ContractsService {
    private readonly web3: Web3;
    private readonly contract: any;

    constructor() {
        this.web3 = new Web3(process.env.BACKEND_GANGACHE_HOST);

        const contractAddress =
            contractConfig.networks[
                Number(process.env.BACKEND_GANGACHE_NETWORK_ID)
            ].address;
        const contractAbi = contractConfig.abi;

        this.contract = new this.web3.eth.Contract(
            contractAbi,
            contractAddress,
        );
    }

    async addUser(email: string, identifier: string) {
        console.log("load accounts");
        const accounts = await this.web3.eth.getAccounts();
        console.log("accounts: ", accounts);

        await this.contract.methods
            .addUser(email, identifier)
            .send({ from: accounts[0] });
    }

    async verifyIdentifier(
        email: string,
        identifier: string,
    ): Promise<boolean> {
        const accounts = await this.web3.eth.getAccounts();

        return await this.contract.methods
            .verifyIdentifier(email, identifier)
            .call({ from: accounts[0] });
    }
}
