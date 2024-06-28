let I = a => a;
console.log('let I = a => a;');
console.log('I(1)', I(1));
console.log('I(2)', I(2));
console.log();

let K = a => b => a;
console.log('let K = a => b => a;');
console.log('K(0)(1)', K(0)(1));
console.log('K(1)(2)', K(1)(2));
console.log();

let K3 = K(3);
console.log('let K3 = K(3);');
console.log('K3(0)', K3(0));
console.log('K3(1)', K3(1));
console.log();

let KI = K(I);
console.log('let KI = K(I);');
console.log('KI(0)(1)', KI(0)(1));
console.log('KI(1)(2)', KI(1)(2));
console.log();

let T = K;
console.log('let T = K;');
console.log();

let F = KI;
console.log('let F = KI;');
console.log();

let toBoolean = f => f(true)(false);
console.log('let toBoolean = f => f(true)(false);');
console.log('toBoolean(T)', toBoolean(T));
console.log('toBoolean(F)', toBoolean(F));
console.log();

let C = f => a => b => f(b)(a);
console.log('let C = f => a => b => f(b)(a);');
console.log();

let NOT = C;
console.log('let NOT = C;');
console.log('NOT(T)', NOT(T));
console.log('NOT(F)', NOT(F));
console.log('toBoolean(NOT(T))', toBoolean(NOT(T)));
console.log('toBoolean(NOT(F))', toBoolean(NOT(F)));
console.log();

let AND = p => q => p(q)(p);
console.log('let AND = p => q => p(q)(p);');
console.log('AND(F)(F)', AND(F)(F));
console.log('AND(F)(T)', AND(F)(T));
console.log('AND(T)(F)', AND(T)(F));
console.log('AND(T)(T)', AND(T)(T));
console.log('toBoolean(AND(F)(F))', toBoolean(AND(F)(F)));
console.log('toBoolean(AND(F)(T))', toBoolean(AND(F)(T)));
console.log('toBoolean(AND(T)(F))', toBoolean(AND(T)(F)));
console.log('toBoolean(AND(T)(T))', toBoolean(AND(T)(T)));
console.log();

let OR = p => q => p(p)(q);
console.log('let OR = p => q => p(p)(q);');
console.log('OR(F)(F)', OR(F)(F));
console.log('OR(F)(T)', OR(F)(T));
console.log('OR(T)(F)', OR(T)(F));
console.log('OR(T)(T)', OR(T)(T));
console.log('toBoolean(OR(F)(F))', toBoolean(OR(F)(F)));
console.log('toBoolean(OR(F)(T))', toBoolean(OR(F)(T)));
console.log('toBoolean(OR(T)(F))', toBoolean(OR(T)(F)));
console.log('toBoolean(OR(T)(T))', toBoolean(OR(T)(T)));
console.log();

let BEQ = p => q => p(q)(NOT(q));
console.log('let BEQ = p => q => p(q)(NOT(q));');
console.log('BEQ(F)(F)', BEQ(F)(F));
console.log('BEQ(F)(T)', BEQ(F)(T));
console.log('BEQ(T)(F)', BEQ(T)(F));
console.log('BEQ(T)(T)', BEQ(T)(T));
console.log('toBoolean(BEQ(F)(F))', toBoolean(BEQ(F)(F)));
console.log('toBoolean(BEQ(F)(T))', toBoolean(BEQ(F)(T)));
console.log('toBoolean(BEQ(T)(F))', toBoolean(BEQ(T)(F)));
console.log('toBoolean(BEQ(T)(T))', toBoolean(BEQ(T)(T)));
console.log();