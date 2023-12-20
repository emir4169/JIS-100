import { Node } from "./lib.js";
const node = new Node();
node.execute(["add acc,5", "add acc,4"]);
console.log(node.acc); // Output: 9