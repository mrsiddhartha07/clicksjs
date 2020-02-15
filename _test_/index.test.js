
const results = require('../index');

describe('My first test suite', () => {
  const [input, output] = ['./_mocks_/mockClicks.json', './_mocks_/mockResultSet.json'];
  it('Normal Test', async () => {
    const data = JSON.parse(await results(input, output));
    expect(Object.keys(data[0])[0]).toBe("11.11.11.11");
  });

  // it('substracts two numbers', () => {
  //   expect(substract(2, 2)).toBe(0)
  // })
})