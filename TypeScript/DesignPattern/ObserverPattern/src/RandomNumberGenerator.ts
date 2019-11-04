import NumberGenerator from "./NumberGenerator";

export default class RandomNumberGenerator extends NumberGenerator {
    private random: number = 0
    public getNumber = (): number => {
        return this.random
    }
    public execute = (): void => {
        for (let i = 0; i < 20; i++) {
            this.random = this.getRandomInt(10)
            this.notifyObservers()
        }
    }
    private getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

}