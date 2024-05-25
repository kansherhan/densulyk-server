export class Random {
    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRandomString(length: number) {
        let result = "";

        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        const charactersLength = characters.length;

        let counter = 0;

        while (counter < length) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength),
            );

            counter += 1;
        }

        return result;
    }
}
