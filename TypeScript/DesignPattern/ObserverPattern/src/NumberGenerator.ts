import Observer from "./ObserverInterface";

export default abstract class NumberGenerator {
    private observers: Observer[] = []
    public addObserver = (observer: Observer): void => {
        this.observers.add(observer)
    }
    public deleteObserver = (observer: Observer): void => {
        this.observers.remove(observer)
    }
    public notifyObservers = (): void => {
        let it: Iterator = this.observers.iterator()
        while (it.hasNext()) {
            let o: Observer = it.next()
            o.update(this)// Observerへ通知
        }
    }
    public abstract getNumber = () => {}
    public abstract execute = () => {}
}