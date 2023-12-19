// run with npm test

function sum(a, b){
    return a+b;
  }

// passing test
it('sums numbers', () => {
expect(sum(1, 2)).toEqual(3);
expect(sum(2, 2)).toEqual(4);
});

// failing test
it('sums numbers', () => {
expect(sum(1, 2)).toEqual(5);
expect(sum(2, 2)).toEqual(4);
});