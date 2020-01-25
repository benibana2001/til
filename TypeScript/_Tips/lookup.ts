interface IPerson {
    id: number
    name: string
    age: number
}

// This type is lookup type
type PersonProps = keyof IPerson

class Field2<T, K extends keyof T> {
    name: K
    label: string
    defaultValue: any
}

const idField: Field2<IPerson, "id"> = new Field2()
const nameField: Field2<IPerson, "name"> = new Field2()
const ageField: Field2<IPerson, "age"> = new Field2()

const addressField: Field2<IPerson, "address"> = new Field2()