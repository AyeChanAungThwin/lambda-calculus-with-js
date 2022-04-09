let I = a => a;
console.log('let I = a => a;');
console.log('I(1):', I(1));
console.log('I(2):', I(2));
console.log();

let K = a => b => a;
console.log('let K = a => b => a;');
console.log('K(0)(1):', K(0)(1));
console.log('K(1)(2):', K(1)(2));
console.log();

let K3 = K(3);
console.log('let K3 = K(3);');
console.log('K3(0):', K3(0));
console.log('K3(1):', K3(1));
console.log();

let KI = K(I);
console.log('let KI = K(I);');

let T = K;
let F = KI;
let C = f => a => b => f(b)(a);
let NOT = C;
let toBoolean = f => f(true)(false);