decrypt: function(c) {
  return c.modPow(this.lambda, this.pubkey.n2)
          .subtract(BigInteger.ONE)
          .divide(this.pubkey.n)
          .multiply(this.x)
          .mod(this.pubkey.n);
}
