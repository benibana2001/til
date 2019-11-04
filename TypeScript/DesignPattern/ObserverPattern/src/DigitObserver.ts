import Observer from "./ObserverInterface";
import NumberGenerator from "./NumberGenerator";

export default class DigitObserver implements Observer {
    // public update = async (generator: NumberGenerator) => {
    public update = async (generator: NumberGenerator): Promise<any> => {
        // await this.sleep(1000)
        console.log("DigitObserver: ", generator.getNumber())
    }
}