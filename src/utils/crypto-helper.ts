import crypto from 'crypto';

import * as Sentry from '@sentry/nestjs';

/**
 * Verifies an Ed25519 signature.
 * @param publicKey - Base64-encoded public key (32 bytes).
 * @param originalMessage - The original message as a string.
 * @param signature - Base64-encoded signature (64 bytes).
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
export function verifySignature(
  publicKey: string,
  originalMessage: string,
  signature: string,
): boolean {
  try {
    // Decode Base64-encoded public key and signature
    const publicKeyBuffer = Buffer.from(publicKey, 'base64');
    const signatureBuffer = Buffer.from(signature, 'base64');
    const messageBuffer = Buffer.from(originalMessage);

    // Validate the length of the public key and signature
    if (publicKeyBuffer.length !== 32) {
      throw new Error(
        'Invalid public key length. Ed25519 public keys must be 32 bytes.',
      );
    }
    if (signatureBuffer.length !== 64) {
      throw new Error(
        'Invalid signature length. Ed25519 signatures must be 64 bytes.',
      );
    }

    // Wrap raw public key in SPKI structure
    const spkiHeader = Buffer.from([
      0x30,
      0x2a, // SEQUENCE
      0x30,
      0x05, // SEQUENCE (OID header)
      0x06,
      0x03,
      0x2b,
      0x65,
      0x70, // OID for Ed25519
      0x03,
      0x21,
      0x00, // BIT STRING
    ]);
    const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${Buffer.concat([spkiHeader, publicKeyBuffer]).toString('base64')}\n-----END PUBLIC KEY-----`;

    // Perform Ed25519 signature verification
    const isValid = crypto.verify(
      null, // No hash algorithm needed for Ed25519
      messageBuffer,
      publicKeyPEM,
      signatureBuffer,
    );

    return isValid;
  } catch (error) {
    // Log the error to Sentry with additional context
    Sentry.captureException(error, {
      contexts: {
        signatureObject: {
          publicKey,
          originalMessage,
          signature,
        },
      },
    });

    throw error;
  }
}
