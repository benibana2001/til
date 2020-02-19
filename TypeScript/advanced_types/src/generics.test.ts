const getData = <T>(url: string): Promise<T> => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
}

// fetch function is not defined, so that this call occur Error.
// getData<IPerson_>('/people/1').then(person => console.log(person))

interface IPerson_ {
    id: number
    name: string
}

class List<T extends object> {
    private data: T[] = []
    public getList(): T[] {
        return this.data
    }
    public add(item: T) {
        this.data.push(item)
    }
    public remove(item: T) {
        // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
        this.data = this.data.filter((dataItem: T) => {
            return !this.equals(item, dataItem)
        })
    }
    private equals(obj1: T, obj2: T) {
        // The every() method tests whether all elements in the array pass the test implemented by the provided function.
        //   It returns a Boolean value.
        return Object.keys(obj1).every(key => {
            return obj1[key] === obj2[key]
        })
    }
}

describe('Check List Class', () => {
    describe('Set vars', () => {
        const billy: IPerson_ = { id: 1, name: 'Billy' }
        const people = new List<IPerson_>()
        beforeAll(() => {
            people.add(billy)
        })
        afterAll(()=>{
            people.remove(billy)
        })
        test('when use getList method, it should return correct List.', () => {
            expect(people.getList()).toEqual([billy])
        })
        test('when use remove, it should return correct List.', () => {
            people.remove(billy)
            expect(people.getList()).toEqual([])
        })
        // people.add('Sally') //  <- Error.
    })
})

