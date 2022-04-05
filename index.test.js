const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mock/invalid2.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mock/invalid4.csv";
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mock/valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
        {
          "id": 1,
          "name": "wiinan",
          "profission": "TI",
          "age": 18
        },
        {
          "id": 2,
          "name": "renan",
          "profission": "medico",
          "age": 39
        },
        {
          "id": 3,
          "name": "outro",
          "profission": "professor",
          "age": 20
        }
      ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
