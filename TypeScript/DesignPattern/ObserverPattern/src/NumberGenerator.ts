import Observer from "./ObserverInterface"
import Observers from "./Observers"
import Iterator from "./IteratorInterface"

export default abstract class NumberGenerator {
    private observers: Observers = new Observers()
    public addObserver = (observer: Observer): void => {
        this.observers.appendObserver(observer)
    }
    // public deleteObserver = (observer: Observer): void => {
    // this.observers.remove(observer)
    // }
    public notifyObservers = async (): Promise<any> => {
        let it: Iterator = this.observers.iterator()
        while (it.hasNext()) {
            (async () => {
                let o: Observer = it.next()
                await o.update(this)// Observerへ通知
            })()
        }
    }
    // TODO: 抽象クラスの書き方が怪しい numberを返したい
    public abstract getNumber = (): number => { return }
    public abstract execute = () => { }
}