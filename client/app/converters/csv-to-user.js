
const User = class {
  constructor(csv) {
    const regExp = /.*?(;|\n)/g;
    let creds = null;
    creds = csv.match(regExp);
    if (creds && creds.length === 3) {
      this.valid = true;
      this.email = creds[0].replace(';','');
      this.password = creds[1].replace(';','');
      this.role = creds[2].replace('\n','');
      this.grade = null;
      this.givenCourse = null;
    } else {
      this.valid = false;
    }
  }
};

const CsvToUser = class {
  constructor() {

  }
  readCsvFile(file) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      const regExp = /.*?\n/g;
      let userCsv = null;
      let userJSON = null;
      let content = null;

      reader.onload = function() {
        content = this.result;
        userCsv = content.toString().match(regExp);
        if (userCsv) {
          userJSON = userCsv.map(questionLatex => {
            return new User(questionLatex);
          });
          resolve(userJSON);
        } else {
          reject('No user in file');
        }
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsText(file);
    });
  }
};

export {CsvToUser};
