use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new(); // `mut` means mutable.

    // let apples = 5; // immutable

    io::stdin()
        .read_line(&mut guess) // `&`はこの引数が参照であることを示す
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
