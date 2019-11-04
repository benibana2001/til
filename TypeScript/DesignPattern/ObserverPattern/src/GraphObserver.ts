import Observer from "./ObserverInterface";
import NumberGenerator from "./NumberGenerator";

export default class GraphObserver implements Observer {
    public update = async (generator: NumberGenerator) => {
        let count: number = generator.getNumber()
        let str: string = " "
        for (let i = 0; i < count; i++) {
            str = str + "*"
        }
        console.log("GraphObserver: ", str)
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