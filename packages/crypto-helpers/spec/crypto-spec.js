const crypto = require('../crypto');

describe("Crypto", () => {
  it("SHA-256 signature", () => {
    expect(crypto.hash("test")).toEqual("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
  });

  it("should sign & verify", () => {
    const keys = {
      priv: `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIMFXriqA9nZG1rw5oRNW5Phu8csodj9p8vaAJdy7u+VsoAcGBSuBBAAK
oUQDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6KsfqpuIoSPk4CIBbI4zyClzzO
MlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END EC PRIVATE KEY-----`,
      pub: `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6K
sfqpuIoSPk4CIBbI4zyClzzOMlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END PUBLIC KEY-----`,
    }

    const signature = crypto.sign(keys.priv, 'something');
    expect(crypto.verify(keys.pub, signature, 'something')).toBe(true);
  });
});

