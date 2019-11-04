import Observer from "./ObserverInterface";

export default interface Iterator {
    hasNext(): boolean
    next(): Observer
}