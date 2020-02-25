// From this article:
//   https://medium.com/@rossbulat/typescript-generics-explained-15c6493b510f
const identity = <T>(arg: T): T => {
    return arg
}

test('identity', () => {
    expect(identity(10)).toEqual(10)
    expect(identity("Hello")).toEqual("Hello")
})

// In this case, <T> is called a type variable(generic parameters, generic parameters).
// T is now a placeholder for the type we wish to pass into identity, and is assigned to arg in place of its type: instead of number, T is now acting as the type.

const identities = <T, U>(arg1: T, arg2: U): T => {
    return arg1
}
test('identities', () => {
    expect(identities(10, "Hello")).toEqual(10)
    expect(identities("Hello", 10)).toEqual("Hello")
})

const identitiesTupple = <T, U>(arg1: T, arg2: U): [T, U] => {
    return [arg1, arg2]
}
test('identitiesTupple', () => {
    expect(identitiesTupple(10, "Hello")).toEqual([10, "Hello"])
    expect(identitiesTupple("Hello", 10)).toEqual(["Hello", 10])
})

// Generic Interfaces
interface Identities<V, W> {
    id1: V,
    id2: W
}
const identitiesObj = <T, U>(arg1: T, arg2: U): Identities<T, U> => {
    let identities: Identities<T, U> = {
        id1: arg1,
        id2: arg2
    }
    return identities
}
test('identitiesObj', () => {
    expect(identitiesObj<number, string>(10, "Hello")).toEqual({ id1: 10, id2: "Hello" })
    expect(identitiesObj(10, "Hello")).toEqual({ id1: 10, id2: "Hello" })
    expect(identitiesObj<string, number>("Hello", 10)).toEqual({ id1: "Hello", id2: 10 })
    expect(identitiesObj("Hello", 10)).toEqual({ id1: "Hello", id2: 10 })
})

// Generic Classes
//   A generic class ensures that specified data types are used consistently throughout a whole class.
class Programmer<T> {
    private languageName: string
    private languageInfo: T
    constructor(lang: string) {
        this.languageName = lang
    }
}
interface Language {
    TypeScript: "TS"
}
type lang = {
    TS: "TypeScript",
    PHP: "PHP",
    Dynamic: {
        JS: "JavaScript",
        Ruby: "Ruby"
    }

}
let programmer1 = new Programmer<lang["Dynamic"]>("Typescript")

// When to Use Generics
//   1. When your function, interface or class will work with a variety of data types
//   2 .When your function, interface or class uses that data type in several places
//
//   It may well be the case that you will not have a component that warrants using generics early on in a project. 
//     But as the project grows, a component’s capabilities often expand. 
//     This added extensibility may well eventually adhere to the above two criteria, 
//     in which case introducing generics would be a cleaner alternative than to duplicate components just to satisfy a range of data types.

// Generic Constraints
interface Length {
    length: number
}
// T is constrained using the extends keyword followed by the type we are extending, within the angled brackets.
//   If we don't constraint (extends Length), errow will occur.
const identityAry = <T extends Length>(arg: T): T => {
    console.log(arg.length)
    return arg
}
// let i = identityAry<number>(10) //  <- This will be error.

// Usecse of the constraint: To check an object key exits.
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key]
}
test('getProperty', () => {
    interface Person {
        id: number,
        age: number,
        hobby: Hobby
    }
    enum Hobby {
        Kendoh,
        Sadoh,
        Kadoh,
        Judoh
    }
    const Tanaka: Person = { id: 11, age: 24, hobby: Hobby.Judoh }
    const Satou: Person = { id: 103, age: 13, hobby: Hobby.Sadoh }
    expect(getProperty<Person, 'age'>(Tanaka, 'age')).toEqual(24)
    expect(getProperty<Person, 'hobby'>(Satou, 'hobby')).toEqual(Hobby.Sadoh)
})

// Usecase as a fetch api
const getRecord = <T, U>(endpoint: string, params: T[]): U => { return }
const getRecords = <T, U>(endpoint: string, params: T[]): U[] => { return }

// Usecase: Manupulating arrays
class Department<T> {
    private employees: Array<T> = []
    constructor(){
        this.employees = new Array<T>()
    }
    public add = (employee: T) => this.employees.push(employee)
    public get = () => this.employees
}
test('Manupulating arrays', ()=>{
    let Takashimaya = new Department<string>()
    Takashimaya.add('John Woo')
    // Takashimaya.add(123) //  <- Error.
    expect(Takashimaya.get()).toEqual(['John Woo'])
})

// Usecase: Extending with classes
//   If we use Programmer class as a property of fetch API, generic constraints will ensure.
class Programmer_ {
    constructor(public fname: string, public lname: string) {}
}
const logProgrammer_ = <T extends Programmer_>(prog: T): string => {
    return (`${prog.fname} ${prog.lname}`)
}
test('Extending with classes', ()=>{
    const ross = new Programmer_("Ross", "Bulat")
    expect(logProgrammer_<Programmer_>(ross)).toEqual("Ross Bulat")
    expect(logProgrammer_<Programmer_>({fname: "Tom", lname: "Lee"})).toEqual("Tom Lee")
    // expect(logProgrammer_<Programmer_>({"Chung Lee"})).toEqual("Chung Lee") //  <- Error.
})