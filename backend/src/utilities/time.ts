export class Time {
    public static getCurrentUnixTime(): number {
        return this.convertToUnixTime(new Date());
    }

    public static convertToUnixTime(date: Date): number {
        return Math.floor(date.getTime() / 1000);
    }
}
