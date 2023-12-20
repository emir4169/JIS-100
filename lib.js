class Node {
  #bak
  #acc
constructor(initialaccumulatorValue = 0, initialBackupValue = 0) {
  this.#acc = initialaccumulatorValue;
  this.#bak = initialBackupValue;
  this.ext = 0; // extra accumulator
}

get bak() {
  return this.#bak;
}

set bak(value) {
  console.warn("Setting the BAK accumulator from outside of the nodes execution is not supported and may be removed.");
}
get acc() {
  return this.#acc;
}

set acc(value) {
  console.warn("Setting the ACC accumulator from outside of the nodes execution is not supported and may be removed.");
}
/**
* Executes the given instruction with the provided operands.
*
* @param {string} instruction - The instruction to be executed.
* @param {any} operand1 - The first operand.
* @param {any} operand2 - The second operand.
* @return {void} This function does not return a value.
*/
executeInstruction(instruction, operand1, operand2) {
console.log(`Executing instruction: ${instruction}`);
console.log(`Operand 1: ${operand1}`);
console.log(`Operand 2: ${operand2}`);

switch (instruction) {
  case "ADD":
    this.#acc = this.getOperandValue(operand1) + this.getOperandValue(operand2);
    break;
  case "SUB":
    this.#acc = this.getOperandValue(operand1) - this.getOperandValue(operand2);
    break;
  case "MOV":
    this.setOperandValue(operand2, this.getOperandValue(operand1));
    break;
  case "SAV":
    this.#bak = this.#acc;
    break;
  case "SWP":
    [this.#acc, this.#bak] = [this.#bak, this.#acc];
    break;
  default:
    console.error(`Invalid instruction: [${instruction},${operand1},${operand2}]`);
    break;
}

console.log(`Result: ${this.#acc}`);
}

/**
* Executes the given instruction string.
*
* @param {string} instructionString - The instruction line to be executed.
* @return {undefined} This function does not return a value.
*/
executeline(instructionString) {
const [instruction, operands] = instructionString.split(" ");
const [operand1, operand2] = operands.split(",");
const upperInstruction = instruction.toUpperCase();
this.executeInstruction(upperInstruction, operand1, operand2);
}
/**
* Executes a list of instructions.
*
* @param {Array} instructionlist - The list of instructions to execute.
*/
execute(instructionList) {
  instructionList.forEach(instruction => {
      this.executeline(instruction);
  });
}

/**
* Returns the value of the given operand.
*
* @param {string} operand - The operand to get the value of.
*                          It can be "acc", "bak", or a number.
* @return {number} - The value of the operand.
*/
getOperandValue(operand) {
switch (operand) {
  case "acc":
    return this.#acc;
  case "bak":
    return this.#bak;
  default:
    return parseInt(operand);
}
}

/**
* Sets the value of the specified operand.
*
* @param {string} operand - The operand to set the value for.
* @param {any} value - The value to set for the operand.
*/
setOperandValue(operand, value) {
if (operand.toUpperCase() === "acc") {
  this.#acc = value;
}
}

}

// Usage
//const node = new Node();
//node.execute(["add acc,5", "add acc,4"]);
//console.log(node.acc); // Output: 9
module.exports = {Node}