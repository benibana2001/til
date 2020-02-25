// Reference:
//   https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/

// Numeric enums
enum Weekend_1 {
    Friday,
    Saturday,
    Sunday
}
enum Weekend_2 {
    Friday = 1,
    Saturday,
    Sunday
}
enum Weekend_3 {
    Friday = 1,
    Saturday = 13,
    Sunday = 5
}
test('Numeric enums', () => {
    expect(Weekend_1.Friday).toEqual(0)
    expect(Weekend_1.Saturday).toEqual(1)
    expect(Weekend_1.Sunday).toEqual(2)
})
test('Reverse mapping', ()=>{
    expect(Weekend_1[2]).toEqual('Sunday')
    expect(Weekend_1['Sunday']).toEqual(2)
})
test("Custom numeri enums", () => {
    expect(Weekend_2.Friday).toEqual(1)
    expect(Weekend_2.Saturday).toEqual(2)
    expect(Weekend_2.Sunday).toEqual(3)

    expect(Weekend_3.Saturday).toEqual(13)
})

// Use enums as function parameters or return types.
const getDate = (day: string): Weekend_1 => {
    if (day === 'remote_work') return Weekend_1.Friday
    if (day === 'absense') return Weekend_1.Saturday
    if (day === 'half_work') return Weekend_1.Sunday
}
test('Use enums as function parameters or return types', () => {
    expect(getDate('remote_work')).toEqual(0)
})

// String enums
enum Weekend_X {
    Friday = 'FRIDAY',
    Saturday = 'SATURDAY',
    Sunday = 'SUNDAY'
}
test('String enums', ()=>{
    const isWorkday = (value: Weekend_X): boolean => {
        if(value === Weekend_X.Friday || value === Weekend_X.Saturday) return true
        else return false
    }
    expect(isWorkday(Weekend_X.Friday)).toBeTruthy()
    expect(isWorkday(Weekend_X.Sunday)).toBeFalsy()
    // expect(isWorkday('Monday')).toBeFalsy() //  <- Error.
})

// Heterogeneous enums
enum Weekend_Y {
    Friday = 'FRIDAY',
    Saturday = 1,
    Sunay = 2
}

// Enums usage: inside array initialisation.
enum Dialect {
    Ohsakaben,
    Kyotoben,
    Kagoshimaben
}
interface Citizen {
    name: string
    age: number
    lang: Dialect
}
const HayarinoGeinin: Citizen = {
    name: 'Sanma',
    age: 50,
    // lang: 'Ohsakaben' //  <- Error.
    lang: Dialect.Ohsakaben
}

// Enums usage: distinct values like:
enum Days {
    Sunday = 1,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}