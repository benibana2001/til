import Iterator from './IteratorInterface'
import Observers from './Observers'
import Observer from './ObserverInterface'
export default class ObserverIterator implements Iterator {
    private observers: Observers
    private index: number
    constructor(obaservers: Observers) {
        this.observers = obaservers
        this.index = 0
    }
    public hasNext = (): boolean => {
        if (this.index < this.observers.getLength()) {
            return true
        } else {
            return false
        }
    }
    public next(): Observer {
        let observer: Observer = this.observers.getObserverAt(this.index)
        this.index++
        return observer
    }
}