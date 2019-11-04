import Observer from "./ObserverInterface";
import NumberGenerator from "./NumberGenerator";

export default class GraphObserver implements Observer {
    public update = async (generator: NumberGenerator) => {
        console.log("GraphObserver: ")
        let count: number = generator.getNumber()
        for (let i = 0; i < count; i++) {
            console.log("*")
        }
        console.log(" ")
        await this.sleep(100)
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