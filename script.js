let numbers = [];
let variables = [];

async function getData() {
  const text = "./source.txt";
  try {
    const response = await fetch(text);
    const data = await response.text();
    numbers = data.split("\n");

    for (let i = 0; i < numbers.length; i++) {
      let puzzle = numbers[i];
      numbers = data.split("\n");

      numbers = numbers.slice(i);

      for (let j = 0; j < numbers.length; j++) {
        for (const num of numbers) {
          if (String(puzzle).slice(-2) === String(num).slice(0, 2)) {
            puzzle += String(num).slice(2);
            const indexOfElement = numbers.indexOf(num);
            numbers.splice(indexOfElement, 1);
          } else if (String(puzzle).slice(0, 2) === String(num).slice(-2)) {
            puzzle = String(num).slice(0, 4) + puzzle;
            const indexOfElement = numbers.indexOf(num);
            numbers.splice(indexOfElement, 1);
          }
        }
      }

      variables.push(puzzle);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return variables.sort((a, b) => b.length - a.length)[0];
}

async function run() {
  const theLongestPuzzle = await getData();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = theLongestPuzzle;
}

run();
