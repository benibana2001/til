fn main() {
    let number = 7;
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }

    let condition = true;
    let number = if condition { 5 } else { 6 }; // ifは四季なのでlet文の右辺に持ってこれる
    println!("The value of number is: {}", number);
}
