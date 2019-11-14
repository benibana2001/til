let greeter = (person: string): string => {
    return "hello, " + person
}

let user: string = "Jane User";

document.body.textContent = greeter(user);