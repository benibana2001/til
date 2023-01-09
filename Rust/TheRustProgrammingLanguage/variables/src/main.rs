fn main() {
    // let mut x = 5;
    // println!("The value of x is: {}", x);
    // x = 6;
    // println!("The value of x is: {}", x);

    // const MAX_POINTS: u32 = 100_000;

    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;

        println!("The value of x in the inner scope is: {}", x);
    }
    println!("The value of x is: {}", x);

    let spaces = "    ";
    let spaces = spaces.len(); // 型が変わっても大丈夫。同名の名前の変数を位置から再定義しているに過ぎないため。

    println!("The value of spaces is: {}", spaces);

    // let mut spaces = "    ";
    // spaces = spaces.len(); // mutは型を維持するためエラーになる
}
