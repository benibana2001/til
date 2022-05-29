function startListener (){
    console.log('start')
}
function fizzListener (count) {
    console.log('Fizz', count)
}
function buzzListner (count ) {
    console.log('Buzz', count)
}

function fizzBuzzListner (count ) {
    console.log('Buzz', count)
}
function endListner () {
    console.log('end')
    this
        .off('start', startListener)
        .off('Fizz', fizzListener)
        .off('Buzz', buzzListner)
        .off('FizzBuzz', fizzBuzzListner)
        .off('end', endListner)
}