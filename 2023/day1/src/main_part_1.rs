use std::{fs};

fn main() {
    calibration_value_from_document("sample_a.txt".to_owned());
    calibration_value_from_document("sample_b.txt".to_owned());
}

fn calibration_value_from_document(path: String) {
    println!("file: {}", path);

    let calibration_document =
        fs::read_to_string(path).expect("Should have been able to read file");

    // println!("calibration document: ");
    // println!("{}", calibration_document);

    let lines = calibration_document
        .lines()
        .map(parse_digits)
        .filter_map(process_line)
        .map(process_calibration_values);

    let mut sum = 0;

    for line in lines {
        sum += line;
        // println!("+ {:?} = {}", line, sum);
    }

    println!("sum: {}", sum)
}

fn parse_digits(input: &str) -> Vec<u32> {
    input
        .chars()
        .filter_map(|character| character.to_digit(10))
        .collect()
}

fn process_line(input: Vec<u32>) -> Option<Vec<u32>> {
    match input.len() {
        0 => None,
        1 => Some(vec![input[0], input[0]]),
        _ => Some(vec![input[0], input[input.len() - 1]]),
    }
}

fn process_calibration_values(input: Vec<u32>) -> u32 {
    input[0] * 10 + input[1]
}
