
const results = require('../index');

describe('My first test suite', () => {
  const [input, output] = ['./_mocks_/mockClicks.json', './_mocks_/mockResultSet.json'];
  it('Normal Test', async () => {
    const data = JSON.parse(await results(input, output));
    expect(Object.keys(data[0])[0]).toBe("11.11.11.11");
  });

  it('Test for more than 10 occurences of an IP', async () => {
    const data = JSON.parse(await results(input, output));
    let newData = Object.values(data).filter((element)=>{
                    if(element["22.22.22.22"])
                    {
                        return true;
                    }
                  });
    expect(newData.length).toEqual(0);
  });
})