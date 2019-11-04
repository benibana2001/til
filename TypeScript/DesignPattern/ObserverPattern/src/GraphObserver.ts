import Observer from "./ObserverInterface";
import NumberGenerator from "./NumberGenerator";

export default class GraphObserver implements Observer {
    public update = async (generator: NumberGenerator): Promise<any> => {
        let count: number = generator.getNumber()
        let str: string = " "
        for (let i = 0; i < count; i++) {
            str = str + "*"
        }
        // await this.sleep(1000)
        console.log("GraphObserver: ", str)
        console.log(" ")
    }
}