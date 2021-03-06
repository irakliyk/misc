const crypto = require("crypto");

let test_vector = [
    { message: "2a66241a42a9ee12994d8068dcf1bb7dfc6637b45450acd43711f637fa5080fc", pub_key: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa", signature: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a0000000000000000000000000000000000000000000000000000000000000000"},
    { message: "8c93255d71dcab10e8f379c26200f3c7bd5f09d9bc3068d3ef4edeb4853022b6", pub_key: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa", signature: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a0000000000000000000000000000000000000000000000000000000000000000"},
    { message: "9bedc267423725d473888631ebf45988bad3db83851ee85c85e241a07d148b41", pub_key: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa", signature: "f7badec5b8abeaf699583992219b7b223f1df3fbbea919844e3f7c554a43dd43a5bb704786be79fc476f91d3f3f89b03984d8068dcf1bb7dfc6637b45450ac04"},
    { message: "9bd9f44f4dcc75bd531b56b2cd280b0bb38fc1cd6d1230e14861d861de092e79", pub_key: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa", signature: "f7badec5b8abeaf699583992219b7b223f1df3fbbea919844e3f7c554a43dd43a5bb704786be79fc476f91d3f3f89b03984d8068dcf1bb7dfc6637b45450ac04"},
    { message: "9bedc267423725d473888631ebf45988bad3db83851ee85c85e241a07d148b41", pub_key: "f7badec5b8abeaf699583992219b7b223f1df3fbbea919844e3f7c554a43dd43", signature: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa182ef1a5b928da07fec769cc8a12db6bcf70dab3f3227fa315e9d5e3e01a3405"},
    { message: "aebf3f2601a0c8c5d39cc7d8911642f740b78168218da8471772b35f9d35b9ab", pub_key: "f7badec5b8abeaf699583992219b7b223f1df3fbbea919844e3f7c554a43dd43", signature: "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa8c4bd45aecaca5b24fb97bc10ac27ac8751a7dfe1baff8b953ec9f5833ca260e"},
    { message: "e47d62c63f830dc7a6851a0b1f33ae4bb2f507fb6cffec4011eaccd55b53f56c", pub_key: "cdb267ce40c5cd45306fa5d2f29731459387dbf9eb933b7bd5aed9a765b88d4d", signature: "160a1cb0dc9c0258cd0a7d23e94d8fa878bcb1925f2c64246b2dee1796bed5125ec6bc982a269b723e0668e540911a9a6a58921d6925e434ab10aa7940551a09"},
    { message: "9bd9f44f4dcc75bd531b56b2cd280b0bb38fc1cd6d1230e14861d861de092e79", pub_key: "cdb267ce40c5cd45306fa5d2f29731459387dbf9eb933b7bd5aed9a765b88d4d", signature: "9046a64750444938de19f227bb80485e92b83fdb4b6506c160484c016cc1852f87909e14428a7a1d62e9f22f3d3ad7802db02eb2e688b6c52fcd6648a98bd009"},
    { message: "e47d62c63f830dc7a6851a0b1f33ae4bb2f507fb6cffec4011eaccd55b53f56c", pub_key: "cdb267ce40c5cd45306fa5d2f29731459387dbf9eb933b7bd5aed9a765b88d4d", signature: "21122a84e0b5fca4052f5b1235c80a537878b38f3142356b2c2384ebad4668b7e40bc836dac0f71076f9abe3a53f9c03c1ceeeddb658d0030494ace586687405"},
];

for (let i = 0; i < test_vector.length; i++) {
    let pub_key = toPem(test_vector[i].pub_key);
    let message = Buffer.from(test_vector[i].message, "hex");
    let signature = Buffer.from(test_vector[i].signature, "hex");
    console.log(i + ": " + crypto.verify(null, message, pub_key, signature));
}

function toPem(hexKey) {
    let buf1 = Buffer.from("302a300506032b6570032100", "hex");
    let buf2 = Buffer.from(hexKey, "hex");
    let keyBuf = Buffer.from(
        "-----BEGIN PUBLIC KEY-----\n" +
        Buffer.concat([buf1, buf2]).toString("base64") +
        "\n-----END PUBLIC KEY-----"
    );

    return crypto.createPublicKey(keyBuf);
}
