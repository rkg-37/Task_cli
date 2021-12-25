const fs = require("fs");
const { execSync } = require("child_process");
const clear = require("clear");

// creating new files
fs.appendFile("task.txt", "", (err) => {
  if (err) throw err;
});
fs.appendFile("completed.txt", "", (err) => {
  if (err) throw err;
});
fs.appendFile("Output.txt", "", (err) => {
  if (err) throw err;
});

let usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text 'hello world' to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;

// testing help command
test("display help sucessful", () => {
  let received = execSync("sh task.sh").toString("utf8");
  //console.log(received);
  expect(received.trim()).toEqual(expect.stringContaining(usage.trim()));
});

//testing add command
test("value added sucessfully", () => {
  // receving and validating
  let st = "jobq";
  let p = 9;
  let message = "task added : jobq  to the list with prority : 9";
  let received = execSync("sh task.sh add " + p + " " + st).toString("utf8");
  expect(received.trim()).toEqual(expect.stringContaining(message.trim()));
});

//testing delete command
test("task deleted sucessfully", () => {
  // receving and validating
  let st = "jobq";
  let message = "task deleted : jobq";
  execSync("sh task.sh ls");
  let received = execSync("sh task.sh del 1").toString("utf8");
  expect(received.trim()).toEqual(expect.stringContaining(message.trim()));
});

//testing completed command
test("task completed sucessfully", () => {
  // receving and validating
  let st = "jobq";
  let message = "completed task : \njobq";
  execSync("sh task.sh add 2 jobq");
  execSync("sh task.sh ls");
  clear();
  let received = execSync("sh task.sh done 1").toString("utf8");
  expect(received.trim()).toEqual(expect.stringContaining(message.trim()));
  //console.log(received);
});

//testing listing command
test("task lisited sucessfully", () => {
  // receving and validating
  let message = "1. jobq  --2";
  execSync("sh task.sh add 2 jobq");
  clear();
  let received = execSync("sh task.sh ls").toString("utf8");
  expect(received.trim()).toEqual(expect.stringContaining(message.trim()));
  //console.log(received);
});

//testing report command
test("task reported sucessfully", () => {
  // receving and validating
  let message =
    "pending Task :  1 \npending Task :  jobq 2\n\ncompleted task :  2\ncompleted task :  \ncompleted task :  jobq";
  //execSync("sh task.sh add 2 jobq");
  let received = execSync("sh task.sh report").toString("utf8");
  expect(received.trim()).toEqual(expect.stringContaining(message.trim()));
  //console.log(received);
});
