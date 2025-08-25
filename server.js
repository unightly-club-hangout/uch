async function loadData() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAe4QpwhrAKISXsS81EjhsIGuww3A6zW2w9C7231DBOp4PImMRbmcU2-FbbC8K2hcCSTD02yIhibmA/pubhtml";
  const response = await fetch(url);
  const data = await response.text();

  // Parse the CSV data
  const lines = data.split('\n');
  const headers = lines[0].split(',');
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
    }
    results.push(obj);
  }

  console.log(results);
}

loadData()