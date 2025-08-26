const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const firebaseServiceAccount = require("../firebase.json");
const { getAuth } = require("firebase-admin/auth");
const BUCKET = "prd-transport.appspot.com";
require("dotenv").config();
const cr ="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCt5d+6+FKEYvpv\nWZ6E3vDKkdLKPZfMckneXIgFQPlxyEjZkX/ba3/n86YdSLT7Ihx8cc0tVmJgGhVz\n/Bfp0GnUInNAVKJzfaNq1tyatQ2CSsS664eNjBanO+CDdSFXbh4Vhn2D51afOD9Z\nphxAlNFgcjmMTNlULCSQli5jAfhB7Vj0s5jNrohVEQQEv3Jtv1ViBRd0pucErcsL\nLo6rFiyCZq/tIy6f/IVBOun8h2TYQI567H6ETpfnfCdYZU7RaKryEQSnSW5vnLbv\nUCDmKAp9TYQR9bdxHE/H4ehR9Mw3Ugl9rvmhYOxtre30ViXhpXwjBpjTsvfWvKSr\n121pXpXVAgMBAAECggEAKNKHlqvwLRFSMn0SlCUE2Dzqw5y5a55hvmAw8zDJTf9j\nMKXyIpeGB3TASGwWxkR/9Ou/K3c1sVM2OYvSrkoFae3raczkdOGn0O8fCvdZND6q\nl6muYNljwP7yqdF/kfdw+wMfKG2QfWCWKIyw4a09yJsP7OJme1bAf6utuILQHWN/\njB1ixUosBIPqpSLZ4hLKv6wuJnZZDdhdxyZASVlFnBNL+djJMvvwhc11sFI6zeAa\n+W5rBkQmwj1r0qh683Fnt+0gt4wIIbUtg6eUsfMf8NAVaZYkCJk5HafPEXFCE9Kv\ncVb8SNRxe+C9ogI8GZyQvKNTUOLKBrs1OqHOjZQSmQKBgQDqX8k2pPgYgv87M5V/\nLP64jySDKaWqiV9ROQZL1aoP7gtBuvBn4WBERqaK681r7KQ1nnSaAMLRTPchWdeH\n1i6REMTLmdWPm7sKGkxDwk9Kx98HCjckOqbGRvFXCkN7UEc9/UgFnP6undetjQ+S\n4M7a9QjQmmc2AoIxi8q+aZSB+QKBgQC98ZAvUkR5QJR6wSPGyMBMpSs0Ig//6/9D\nkhGB04uR6fEPMD4y5z4Z68qL9Ho9V3jGCwH0SQ3R66X9dgCLcOorOtwzc0jNsnWb\nqZzUBEea+z9zvPwepYWP2HEPlsjmBfvYAHjUpU/0BF+fKLl5iu4HG5yQhcVc12YC\nZJFVW6fpvQKBgCAlhTa+h9zs0s8u8xlfdYyg7ZQj+Tob33wHg0qRguLudpLMbj8B\nVa/ntN4nG6Tq71b/ZeTdp9sHYHotlXdnNDnnf+ahMf6hkJUBKGa+1xtdsMSJbSjF\n9qwJfP7ARKM8Tpk9DUzfzLrsoXGHgJRXy2eS5mOeWfu5elwLXYKifqEZAoGAXZ6o\nwIo98b2g8Xgs2BeuoJhwWPvJAw0g/f8K3gCUtFCoXiIbJh/P/hq39I+FiKKKhqJ6\nThuL0kHhyLHWxuPap4AVdM6HvcsOKLFK+T06xeq8daFaawiOcj3uTA636phcbzSc\nWcM5Sz60mtAJyxxtAdfcLWehxYbtYpSLBZVth8kCgYEAxZyj9Glfk1G0Ti6sI6lB\ncxrx9aoqZzQaxd3AhvCGdFjusv9y1RoEPyjfvqttAycNkhckXfDJeUsNOsRxfzBJ\n5PoBqr6OY5ViEhe8sEe2ceiiz5V8NMnr7guIcmSyGPtwku8l1ykQCofWgvgNFQ5T\nVavFg5vHX1oS4dxTcfqenec=\n-----END PRIVATE KEY-----"
const config = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: cr, // Replace literal \n with actual new lines
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderCertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientCertUrl: process.env.CLIENT_X509_CERT_URL,
  universeDomain: process.env.UNIVERSE_DOMAIN,
};
const firestoreApp = admin.initializeApp(
  {
    credential:  admin.credential.cert(config),
    databaseURL: "https://prd-transport-default-rtdb.europe-west1.firebasedatabase.app",
  },
  "firestoreApp"
);
admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const db = admin.firestore;
module.exports = {
  admin,
  firestoreApp,
  db,
  bucket,
};
