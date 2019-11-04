import Observer from "./ObserverInterface";
import NumberGenerator from "./NumberGenerator";

export default class DigitObserver implements Observer {
    // public update = async (generator: NumberGenerator) => {
    public update = (generator: NumberGenerator) => {
        console.log("DigitObserver: ", generator.getNumber())
        // await this.sleep(1000)
    }

    private sleep = async (milliSec: number): Promise<any> => {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, milliSec)
            }
        )
    }
}