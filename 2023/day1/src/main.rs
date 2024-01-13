use std::{fmt::format, fs};

fn main() {
    calibration_value_from_document("sample_c.txt".to_owned());
    calibration_value_from_document("sample_b.txt".to_owned());
}

fn calibration_value_from_document(path: String) {
    println!("file: {}", path);

    let calibration_document =
        fs::read_to_string(path).expect("Should have been able to read file");

    // println!("calibration document: ");
    // println!("{}", calibration_document);

    let lines = calibration_document.lines().map(replace_with_numbers);

    let mut sum = 0;

    for line in lines {
        sum += line;
        // println!("+ {:?} = {}", line, sum);
    }

    println!("sum: {}", sum)
}

fn replace_with_numbers(input: &str) -> u32 {
    let mut it = (0..input.len()).filter_map(|index| {
        let unprocessed_line = &input[index..];

        let result = match unprocessed_line {
            s if s.starts_with("one") => '1',
            s if s.starts_with("two") => '2',
            s if s.starts_with("three") => '3',
            s if s.starts_with("four") => '4',
            s if s.starts_with("five") => '5',
            s if s.starts_with("six") => '6',
            s if s.starts_with("seven") => '7',
            s if s.starts_with("eight") => '8',
            s if s.starts_with("nine") => '9',
            _ => unprocessed_line.chars().next().unwrap(),
        };

        result.to_digit(10)
    });

    let first = it.next().expect("should be a number");

    match it.last() {
        Some(num) => format!("{first}{num}"),
        None => format!("{first}{first}"),
    }
    .parse::<u32>()
    .expect("should be a valid number")
}
