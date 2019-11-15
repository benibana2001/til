import {Test} from "./importTest.js";

let greeter = (person: string): string => {
    return "hello, " + person
}

let greeterTest = (): string => {
    let t: Test = new Test()
    return t.getValue()
}

let user: string = "Jane User desu";

document.body.textContent = greeter(user);
document.body.textContent = greeterTest();