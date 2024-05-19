import { MailerModule } from "@nestjs-modules/mailer";

export const CreateMailerModule = () => {
    return MailerModule.forRoot({
        transport: {
            host: process.env.BACKEND_MAIL_HOST,
            auth: {
                user: process.env.BACKEND_MAIL_USER,
                pass: process.env.BACKEND_MAIL_PASSWORD,
            },
        },
    });
};

import { Injectable } from "@nestjs/common";
import Web3 from "web3";
import TwoFactorAuthArtifact from "./artifacts/TwoFactorAuth.json";

@Injectable()
export class ContractService {
    private readonly web3: Web3;
    private readonly contract: any;

    constructor() {
        this.web3 = new Web3("http://localhost:8545");
        const contractAddress = "0xFBEfEf46b86BE66581Ed9f9cd224A1649f665d03";
        const contractAbi = TwoFactorAuthArtifact.abi;
        this.contract = new this.web3.eth.Contract(
            contractAbi,
            contractAddress,
        );
    }

    async setUserSecret(secret: number) {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods
            .setUserSecret(secret)
            .send({ from: accounts[0] });
    }

    async verifyCode(code: number) {
        const accounts = await this.web3.eth.getAccounts();
        return await this.contract.methods
            .verifyCode(code)
            .call({ from: accounts[0] });
    }
}
