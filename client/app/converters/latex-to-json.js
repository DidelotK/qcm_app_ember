
const Question = class {
  constructor(latex) {
    this.valid = true;
    this.question = this.getQuestionInLatex(latex);
    this.answers = this.getAnswersInLatex(latex);
    this.all = this.getAllInLatex(latex);
    this.difficulty = 1;
  }
  getQuestionInLatex(latex) {
    const regExp = /\\begin(.|\n)*?\\begin({.*?})+\n/;
    let question = latex.match(regExp);
    if (!question) {
      this.valid = false;
      return -1;
    }
    return question[0].replace(/\\begin({.*?})+\n/g,'');
  }
  getAnswersInLatex(latex) {
    const regExReponses = /\\begin{reponses(.|\n)*?\\end{reponses/;
    const regExpAnswers = /\\bonne{(.|\n)*?}\n/g;
    let answers = null;

    latex = latex.match(regExReponses)[0];
    if (!latex) {
      this.valid = false;
      return -1;
    }
    answers = latex.match(regExpAnswers);
    if (!answers) {
      this.valid = false;
      return -1;
    }
    answers = answers.map(answer => {
      return answer
        .replace(/\\bonne{/, '')
        .replace(/}\n/, '');
    });
    return answers;
  }
  getAllInLatex(latex) {
    const regExReponses = /\\begin{reponses(.|\n)*?\\end{reponses/;
    const regExpAll = /(\\mauvaise{(.|\n)*?}\n|\\bonne{(.|\n)*?}\n)/g;
    let all = null;

    latex = latex.match(regExReponses)[0];
    if (!latex) {
      this.valid = false;
      return -1;
    }
    all = latex.match(regExpAll);
    if (!all) {
      this.valid = false;
      return -1;
    }
    // If all the answers are true
    if (all.length === this.answers.length) {
      this.valid = false;
      return -1;
    }
    all = all.map(answer => {
      return answer
        .replace(/\\bonne{/, '')
        .replace(/\\mauvaise{/, '')
        .replace(/}\n/, '');
    });
    return all;
  }
};

const LatexToJSON = class {
  constructor() {

  }
  readLatexFile(file) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      const regExp = /\\begin{question}(.|\n)*?\\end{question}/g;
      let questionsLATEX = null;
      let questionsJSON = null;

      let content = null;
      reader.onload = function() {
        content = this.result;
        questionsLATEX = content.match(regExp);
        if (questionsLATEX) {
          questionsJSON = questionsLATEX.map(questionLatex => {
            return new Question(questionLatex);
          });
          resolve(questionsJSON);
        } else {
          reject('No question in file');
        }
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsText(file);
    });
  }
};

export {LatexToJSON};
