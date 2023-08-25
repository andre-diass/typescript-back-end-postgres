console.log("hello world");

let megasena: (number | string)[];

megasena = [124, 5, 45, 45, "love"];

enum StatusEnum {
  op1 = "status",
  op2 = "status2",
}

function changeStatus(option: StatusEnum) {
  console.log(option);
}

console.log(changeStatus(StatusEnum.op1));
