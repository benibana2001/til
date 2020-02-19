interface IPerson__ {
    id: number
    name: string
    age: number
}

// the PersonProps type is a lookup type because it looks up the literals it needs to contain.
type PersonProps = keyof IPerson__

// We are looking up the type using T[K]. 
//   For idField, this will resolve to the type of the id property in IPerson, which is number.
class Field_<T, K extends keyof T> {
    name: K
    label: string
    defaultValue: T[K]
}

const idField: Field_<IPerson__, "id"> = new Field_()
// idField.defaultValue = "2" // <- Error; "2" is not match T[K] (= number).
idField.defaultValue = 2

interface IPerson___ {
    id: number
    name: string
}

// mapped types allow us to specifically define the properties in the new type by mapping them from the existing property.
//
// iterates through all the properties in IPerson and assigns each one to P to create the type. 
type ReadonlyPerson = { readonly [P in keyof IPerson___]: IPerson___[P] }
// This type is same following:
/*
type ReadonlyPerson = { 
    readonly id: number
    readonly name: string 
  };
 */
let billy: ReadonlyPerson = { id: 1, name: 'Billy' }
// billy.name = 'Sally' //  <- Error. billy is readonly.

// A more generic version of this mapped type is actually in TypeScript as a standard type, and is Readonly<T>. 
let sally: Readonly<IPerson___> = {id: 1, name: 'Sally'}
// sally.id= 10 //  <- Error. billy is readonly.

type Stringify<T> = { [P in keyof T]: string}
let tim: Stringify<IPerson___> = { id: "1", name: "Tim"}
// tim.id = 1 // <- Error. id property should be string.