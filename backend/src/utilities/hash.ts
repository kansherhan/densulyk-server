import { randomBytes as CryptoRandomBytes } from "crypto";

export class Hash {
    public static generate(length: number): string {
        return CryptoRandomBytes(length).toString("hex").substring(0, length);
    }
}
