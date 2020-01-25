const getData = <T>(url: string): Promise<T> => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
}

interface IPerson {
    id: number
    name: string
}

getData<IPerson>("/people/1").then(person => console.log(person))

class List<T> {
    private data: T[] = []

    public getList(): T[] {
        return this.data
    }

    public add(item: T) {
        this.data.push(item)
    }

    public remove(item: T) {
        this.data = this.data.filter(
            (dataItem: T) => {
                return !this.equals(item, dataItem)
            }
        )
    }

    private equals(obj1: T, obj2: T) {
        return Object.keys(obj1).every(
            key => {
                return obj1[key] === obj2[key]
            }
        )
    }
}

const billy: IPerson = { id: 1, name: "Billy" }

const people = new List<string>()

const items = people.getList()
