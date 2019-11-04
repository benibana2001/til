import NumberGenerator from "./NumberGenerator";
import RandomNumberGenerator from "./RandomNumberGenerator";
import Observer from "./ObserverInterface";
import DigitObserver from "./DigitObserver";
import GraphObserver from "./GraphObserver";

let generator: NumberGenerator = new RandomNumberGenerator()
let observer1: Observer = new DigitObserver()
let observer2: Observer = new GraphObserver()

generator.addObserver(observer1)
generator.addObserver(observer2)
generator.execute()