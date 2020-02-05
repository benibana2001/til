const EVENT = 'keydown'

class Hero{
    constructor() {
        document.addEventListener(EVENT, this.keyEventFunc)
    }

    keyEventFunc = (event: KeyboardEvent) => {
        switch (event.code) {
            case 'ArrowDown': console.log('DOWN'); break;
            case 'ArrowLeft': console.log('LEFT'); break;
            case 'ArrowUp': console.log('UP'); break;
            case 'ArrowRight': console.log('RIGHT'); break;
        }
    }
}

const Sato = new Hero()