import NumberGenerator from "./NumberGenerator";

export default class RandomNumberGenerator extends NumberGenerator {
    private random: number = 0
    public getNumber = (): number => {
        return this.random
    }
    public execute = async(): Promise<any> => {
        for (let i = 0; i < 20; i++) {
            this.random = this.getRandomInt(10)
            this.notifyObservers()
            await this.sleep(500)
        }
    }
    private getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    private sleep = async (milliSec: number): Promise<any> => {
        return new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve()
                    }, milliSec
                )
            }
        )
    }

}