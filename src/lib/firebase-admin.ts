import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "up-gestao",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDngi/rC22799Th\nzIBJfCSqRyvnJjolV1aE7Sk9k5u1Dlz8v0hPz/68ij8qaDEkeAhjKlJ35OSY4e3X\nhoxERaS1bd5PqJ6tTZJb2kebGpTsvmDkBoey+5LVASiN0b7VZzgdwrBTvYi52I6H\nBqLoS76Rzb3kgHxOf5p3jmyn7QamUUId1WddL8p+9VRukhbe7qTQIPoLuF3N+O4Y\n65G2zhTHITzG/m9hZZYJ+/XE5Wi+tMAQw02+/urMXoN4u7M9CTBuGXhW9hS8BsaQ\nF6ziYLIDnmBTt0I7ADy0Ejp3i/S6N0Up8l/g/+J4EZjAn09mr0d3oxlgtm5voBvv\njqNOtQXlAgMBAAECggEACVMrWnCQqDZUjw7FaRBUyr4IpOwbgfcJX1vNIjOQnUOZ\nl72drEdQt6fq4Oqm9hTWo6XoAffIhGbvRVPgUPysJHmrL3K3h3v9JfF+Gl+A+aM2\ndGDV9O3grW85QrMc2GwqrLozj3/uIqw4G3S3OZuZbraGjE5nk2Lc5i1or3/i2W6P\nVYvVO/CwM0DTzHOv2X3DvQPtMuXP19ziQgF3NjTALga1ORgZevlcrE6ZxgH8cG6O\nLWT25VeZvp3nLbD3UmSTRGGDWX6wYtI2ofBK+r13Gzw3w6Mwi/zKNR/oUkvCs8QL\nd8Kih8XkRoBJ7rBzs5rAUQL89TXQEu9IrEdgu/GugQKBgQD+UyfDhjnIobdpQegp\nu3RQIOAlrnBLcOgqX4Wt4L/vT+84t9FE+mEvBoMBeT7oHLqoqMw9lib/7EbK69pz\n/BrcahYKVXZFNH9PJkZsVbq1Q/lMkAlRdPOIg77sxiJn/k6TPAqR4dLI9vc/VjET\nxfLfUbHnmjztl6MFGxvIXiYtgQKBgQDpCI8QgJWlKHh28UP/HGMnoo6omHAHJUGh\nVOf9hNbOhXyFG9+l5dtLF2xvqpeACNkJCKtqasoW7mH6Y8uYZBJQ6qaGnQy1UePk\nTk6Oip4AXaorLLAUlxRGB3AJ6Md/itaDWZD6+suhk3llIMlOglA8C7pz636K+m4P\nI2Jwt3ISZQKBgQCorubU3JY+6GQKQFiINXj0HJoO5CA/KWgTkr/LkCI9zDrS17jJ\nk3gaBKunso9yzHtRmoO85XaAkGpz9PMzsqbuQr7To9OKG0PFb5GOEV6BE9CqY26K\nxJMynI9p5BC2AQqExXINSEbSXFuperWac9SfIkRpZPe8brMFk/FdeHTCAQKBgQCh\nr+6T5KPwFESBQqWLPIcP2RpioGIakx8WcXMF1EW2xafAM7bZxMKDN51lXVgA3iK4\nwestyyqs/nm84cFB2y1aN3WTsSRAKrGUl0CqZkN6vYJ0smz53FmUvVRfi8PgGtT8\nDgkqGxlu4oQ4RqdmccR55SlZhOwoQdpbZpHG44GigQKBgB/PrWIO2sie5iYqvxAX\nYTVtOB9zfzh+207kkGfvBcAA+kg1K9bjbghZmFD1MLa+sAV0BtPpTfnNJnCCXerW\noAeWzeksMsf1bZbOAbnDk3/aoTI1U8D/XHSjwn0C/UMO6S0RTXXYDLmpRhtdd5T3\n0/PcK5ZBSuLbbG3PQGzS4EGT\n-----END PRIVATE KEY-----\n",
      clientEmail: "firebase-adminsdk-fbsvc@up-gestao.iam.gserviceaccount.com",
    }),
  });
}

export const adminDb = admin.firestore(); 