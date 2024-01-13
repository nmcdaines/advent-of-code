use nom::{bytes::complete::tag, multi::separated_list1, sequence::preceded, IResult};
use std::fs;

struct Cube<'a> {
    color: &'a str,
    amount: usize,
}

struct Game<'a> {
    rounds: Vec<Vec<Cube<'a>>>,
}

fn cubes(input: &str) -> IResult<&str, Vec<Cube>> {
    todo!();
}

fn game(input: &str) -> IResult<&str, Game> {
    let (input, id) = preceded(tag("Game "), digit1)(input)?;
    let (input, rounds) = preceded(tag(": "), separated_list1(tag("; "), cubes))(input)?;
}

fn parse_games(input: &str) -> IResult<&str, Vec<Game>> {
    todo!()
}

fn main() {
    println!("Hello, world!");

    read_file("sample_a.txt").lines().map(parse_line)
}

fn read_file(file_path: String) -> String {
    fs::read_to_string(file_path).expect("Should have been able to read file")
}

fn parse_line(line: &str) {
    let parts = line.split(":").collect::<Vec<_>>();

    let [round_descriptor, round_details] =
        { [parts[0].replace("Game ", ""), parts[1].to_string()] };
}
