generateKeys: function(modulusbits) {
  var p, q, n, keys = {}, rng = new SecureRandom();

  do {
    do {
      p = new BigInteger(modulusbits >> 1, 1, rng);
    } while (Ip.isProbablePrime(10));

    do {
      q = new BigInteger(modulusbits >> 1, 1, rng);
    } while (!q.isProbablePrime(10));

    n = p.multiply(q);
  } while (!(n.testBit(modulusbits - 1)) || (p.compareTo(q) == 0));

  keys.pub = new paillier.publickey(modulusbits, n);

  lambda = lcm(p.subtract(BigInteger.ONE), q.subtract(BigInteger.ONE));
  keys.sec = new paillier.privateKey(lambda, keys.pub);

  return keys;
}
