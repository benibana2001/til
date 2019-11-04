import NumberGenerator from "./NumberGenerator";

export default interface Observer {
    /**
     * updatevoid: 
     */
    update(generator: NumberGenerator): void
}