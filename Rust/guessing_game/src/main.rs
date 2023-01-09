use rand::Rng; // randクレートのRngトレイとを追加
use std::{cmp::Ordering, io};

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..101); //range 1以上101未満

    // println!("The secret number is: {}", secret_number);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new(); // `mut` means mutable.

        // let apples = 5; // immutable

        io::stdin()
            .read_line(&mut guess) // `&`はこの引数が参照であることを示す
            .expect("Failed to read line");

        //shadowing シャドーイング
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"), // Orderingもenumの一つ
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
