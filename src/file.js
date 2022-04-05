const fs = require("fs");
const { error } = require("./constants");
const User = require("./user");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profission", "age"],
};

class File {
  static async csvToJson(path) {
      const content = await File.getFileContent(path);
      const validation = File.isValid(content);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const users = File.parseCSVToJson(content)
      return users;
  }

  static async getFileContent(path) {
      return (await fs.promises.readFile(path)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
      const [header, ...fileWithoutHeader] = csvString.split("\n");

      const isHeaderValid = header === options.fields.join(",");

      const isContentLengthAccepted = fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines;

      if (!isHeaderValid) {
        return {
          error: error.FILE_FIELDS_ERROR_MESSAGE,
          valid: false,
        };
      }

      if (!isContentLengthAccepted) {
        return {
          error: error.FILE_LENGTH_ERROR_MESSAGE,
          valid: false,
        };
      }

      return { valid: true };
  }

  static parseCSVToJson (csv) {
      const lines = csv.split('\n')
      const firstLine = lines.shift()
      const header = firstLine.split(',')

      const users = lines.map(line => {
          const columns = line.split(',')
          let user = {}
          for(const index in columns) {
            user[header[index]] = columns[index]
          }

          return new User(user);
      })

      return users
  }
}

// (async () => {
//   try {
//     const result = await File.csvToJson("../mock/valid.csv");
//     //   const result = await file.csvToJson("../mocks/invalid.csv");
//     //   const result = await file.csvToJson("../mocks/valid.csv");
//     //   const result = await file.csvToJson("../mocks/invalid4.csv");
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// })();

module.exports = File;