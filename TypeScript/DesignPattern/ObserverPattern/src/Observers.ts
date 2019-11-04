import Observer from "./ObserverInterface"
import Iterator from "./IteratorInterface"
import ObserverIterator from "./ObserverIterator"

export default class Observers {
    private observers: Observer[] = []
    private last: number = 0
    public getObserverAt = (index: number): Observer => {
        return this.observers[index]
    }
    public appendObserver = (observer: Observer): void => {
        this.observers[this.last] = observer
        this.last++
    }
    public getLength = (): number => {
        return this.last
    }
    public iterator = (): Iterator => {
        return new ObserverIterator(this)
    }
}