fn main() {
    another_function(5, 'h');

    // ブロック{}は式である
    let y = {
        let x = 3;
        x + 1 // 式は終端にセミコロンを含まない
    };
    println!("The value of y is: {}", y);

    let x = five();
    println!("The value of x is: {}", x);

    let x = plus_one(5);
    println!("The value of x is: {}", x);

    println!("fn f2c(200) -> {}", f2c(911.0));
    println!("fn c2f(20.0) -> {}", c2f(20.0));
}

fn another_function(x: i32, unit_label: char) {
    println!("The value of x is: {}{}", x, unit_label);
}

fn five() -> i32 {
    5
}

fn plus_one(x: i32) -> i32 {
    x + 1
}

// 温度を華氏(Fahrenheit)と摂氏(Celsius)で変換する。
// F2C = (F - 32) x (5 / 9);
// C2F = C x (9 / 5) + 32;
fn f2c(x: f32) -> f32 {
    (x - 32.0) * 5.0 / 9.0
}

fn c2f(x: f32) -> f32 {
    x * 9.0 / 5.0 + 32.0
}

// フィボナッチ数列のN番目を表示する
// 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
fn fibo(x: i32) -> i32 {
    let mut counter = 1;

    let mut result = 1;

    while counter < x {
        counter += 1;

        i = result;
    }

    result
}
