const argv = require("minimist")(process.argv.slice(2));
const files = require("./lib/files");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { exit } = require("process");
const log = console.log;
let task = [];
let Op = argv._[0];
// console.log(argv);
// console.log(argv._[0]);
//console.log(argv["a"] + " " + argv["b"]);

// file creation
if (files.directoryExists("task.txt")) {
  //console.log("contain the task file");
} else {
  fs.appendFile("task.txt", "", (err) => {
    if (err) throw err;
    //console.log("The task.txt created!");
  });
}

if (files.directoryExists("completed.txt")) {
  //console.log("contain the completed file");
} else {
  fs.appendFile("completed.txt", "", (err) => {
    if (err) throw err;
    //console.log("The completed.txt created!");
  });
}

// command processing
if (Op == "report") {
  f1 = "task.txt";
  f2 = "completed.txt";
  log(`\n`);
  processLineByLine(f1, "pending Task :");
  processLineByLine(f2, "completed task :");
}

if (Op == "ls") {
  processLineByLine_ls("task.txt");
}

if (Op == "del") {
  fs.appendFile("output.txt", "", (err) => {
    if (err) throw err;
    //console.log("The completed.txt created!");
  });
  processLineByLine_del("output.txt", parseInt(argv["n"]));
}

if (Op == "done") {
  processLineByLine_done("Output.txt", parseInt(argv["n"]));
}

// function to read file line by line
//del
async function processLineByLine_del(file_name, num) {
  // get the job from output file
  const fileStream = fs.createReadStream(file_name);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let count = 1;
  let task_del = "";
  for await (const line of rl) {
    for (i = 0; i < line.length; i++) {
      if (line[i] == "-") {
        if (count == num) {
          task_del = line.slice(3, i - 1);
        }
      }
    }
    count++;
  }

  // modify task file
  const fS = fs.createReadStream("task.txt");
  const rl1 = readline.createInterface({
    input: fS,
    crlfDelay: Infinity,
  });
  let data = "";
  for await (const line of rl1) {
    for (i = 0; i < line.length; i++) {
      if (parseInt(line[i])) {
        if (line.slice(0, i).trim() == task_del.trim()) {
          continue;
        } else {
          data = data + line.slice(0, i).trim() + " " + line[i] + "\n";
        }
      }
    }
  }

  fs.writeFile("task.txt", data, (err) => {
    if (err) throw err;
  });
  console.log("task deleted : " + task_del);
}

// function to read file line by line
//report
async function processLineByLine(file_name, message) {
  const fileStream = fs.createReadStream(file_name);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let count = 0;
  let print = "";
  for await (const line of rl) {
    print = print + `${message}  ${chalk.yellow(line)}\n`;
    count++;
  }
  console.log(`${message} ${count} `);
  log(print);
}

// function to read file line by line
//done
async function processLineByLine_done(file_name, num) {
  const fileStream = fs.createReadStream(file_name);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let count = 1;
  let task_done = "";
  for await (const line of rl) {
    for (i = 0; i < line.length; i++) {
      if (line[i] == "-") {
        if (count == num) {
          task_done = line.slice(3, i);
          break;
        }
      }
    }
    count++;
  }

  // modify task file
  const fS = fs.createReadStream("task.txt");
  const rl1 = readline.createInterface({
    input: fS,
    crlfDelay: Infinity,
  });
  let data = "";
  for await (const line of rl1) {
    for (i = 0; i < line.length; i++) {
      if (parseInt(line[i])) {
        if (line.slice(0, i).trim() == task_done.trim()) {
          continue;
        } else {
          data = data + line.slice(0, i).trim() + " " + line[i] + "\n";
        }
      }
    }
  }

  // wrute to task file
  fs.writeFile("task.txt", data, (err) => {
    if (err) throw err;
  });

  // complete write
  task_done = "\n" + task_done.trim();
  fs.appendFileSync("completed.txt", task_done);
  log("completed task : " + task_done);
  task_done = "";
}

// function to read file line by line
// function for displaying list of task in ascending order
// ls command
async function processLineByLine_ls(file_name) {
  const fileStream = fs.createReadStream(file_name);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  task = [];
  let job = new Object();
  for await (const line of rl) {
    //console.log(`${message}\t${line} \n`);
    for (i = 0; i < line.length; i++) {
      if (parseInt(line[i])) {
        job.task = line.slice(0, i);
        job.p = parseInt(line[i]);
        task.push(job);
        job = new Object();
      }
    }
  }
  //log(task);
  function compare(a, b) {
    if (a.p < b.p) {
      return -1;
    }
    if (a.p > b.p) {
      return 1;
    }
    return 0;
  }
  let data = "";
  function print() {
    task.sort(compare);
    task.forEach(function (t, index) {
      console.log(index + 1 + ". " + t["task"] + " --" + t["p"]);
      data =
        data + (index + 1 + ". " + t["task"].trim() + "--" + t["p"]) + "\n";
    });
  }
  print();

  fs.writeFile("Output.txt", data, (err) => {
    if (err) throw err;
  });
}
