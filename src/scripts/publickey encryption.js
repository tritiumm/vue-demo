encrypt: function(m) {
  return this.randomize(this.n.multiply(m).add(BigInteger.ONE).mod(this.n2));
}
