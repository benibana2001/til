// union types allow us to combine any types together to form another type.
//   This allows us to create stricter types, particularly when working with strings.
// 
// String literal types aren't that useful on their own. 
//   However, they become extremely useful when used in a union type,
type Control = "Textbox" | "DropDown" | "DatePicker" | "NumberSlider"
let notes: Control
notes = "Textbox"
notes = "DropDown" //  It cannot works.
notes = null
notes = undefined

// we can create union types from any types, and not just string literals.
//   In this case, we have created a union type from three interfaces.
type Field = ITextbox | IDatePicker | INumberSlider | ICheckbox
interface ITextbox {
    control: "Textbox"
    value: string
    multiline: boolean
}
interface IDatePicker {
    control: "DatePicker"
    value: Date
}
interface INumberSlider {
    control: "NumberSlider"
    value: number
}
interface ICheckbox {
    control: "Checkbox"
    value: boolean
}

const initializeValue = (field: Field) => {
    // This (field.control) is like a Type guards.
    switch (field.control) {
        case "Textbox":
            field.value = ""
            break
        case "DatePicker":
            field.value = new Date()
            break
        case "NumberSlider":
            field.value = 0
            break
        case "Checkbox":
            field.value = false
            break
        default:
            const shouldNotReach: never = field
    }
}

// typeof is great for branching on JavaScript types but not ideal for TypeScript specific types.
type StringOrStringArray = string | string[]
const first = (stringOrArray: StringOrStringArray): string => {
    if (typeof stringOrArray === 'string') {
        return stringOrArray.substr(0, 1)
        // HERE ... 'object'
    } else if (typeof stringOrArray === 'object') {
        return stringOrArray[0]
    } else {
        const shouldNotReach: never = stringOrArray
    }
}
test('if stringOrArray is a string; otherwise, it should return the first array element', () => {
    expect(first('The')).toBe('T')
    expect(first(['The', 'cat'])).toBe('The')
})

// instanceof is great for narrowing down the type if we are dealing with classes.j
class Person {
    id: number
    firstName: string
    surname: string
    constructor(id: number, fName: string, sName: string) { this.id = id; this.firstName = fName; this.surname = sName }
}
class Company {
    id: number
    name: string
    constructor(id: number, name: string) { this.id = id; this.name = name; }
}
type PersonOrCompany = Person | Company
const logName = (personOrCompany: PersonOrCompany) => {
    if (personOrCompany instanceof Person) {
        return (`${personOrCompany.firstName} ${personOrCompany.surname}`)
    } else {
        return (personOrCompany.name)
    }
}
test('if personOrCompany is a Person, it should return the fullname; otherwise, it should return the just name (not full)', () => {
    let p = new Person(1, 'Raymond', 'Chandler')
    let c = new Company(1, 'Kadokawa')
    expect(logName(p)).toBe('Raymond Chandler')
    expect(logName(c)).toBe('Kadokawa')
})

// the in keyword is pretty flexible. 
//   It can be used with any object to narrow down its type by checking if a property exists.
interface IPerson {
    id: number;
    firstName: string;
    surname: string;
}

interface ICompany {
    id: number;
    name: string;
}

type IPersonOrICompany = IPerson | ICompany;
const ILogName = (iPersonOrCompany: IPersonOrICompany) => {
    if ('firstName' in iPersonOrCompany) {
        return (`${iPersonOrCompany.firstName} ${iPersonOrCompany.surname}`)
    } else {
        return (iPersonOrCompany.name)
    }
}
test('if personOrCompany is a Person, it should return the fullname; otherwise, it should return the just name (not full)', () => {
    let p: IPerson = { id: 1, firstName: 'Raymond', surname: 'Chandler' }
    let c: ICompany = { id: 1, name: 'Kadokawa' }
    expect(ILogName(p)).toBe('Raymond Chandler')
    expect(ILogName(c)).toBe('Kadokawa')
})

// Using a user-defined type guard
//
// The type predicate personOrCompany is IPerson helps the TypeScript compiler narrow down the type.
//   To confirm this, hovering over personOrCompany in the first branch should give the IPerson type.  
const isPerson = (iPersonOrICompany: IPersonOrICompany): iPersonOrICompany is IPerson => {
    return 'firstName' in iPersonOrICompany
}
const ILogNameByIsPerson = (iPersonOrCompany: IPersonOrICompany) => {
    if (isPerson(iPersonOrCompany)) {
        return (`${iPersonOrCompany.firstName} ${iPersonOrCompany.surname}`)
    } else {
        return (iPersonOrCompany.name)
    }
}