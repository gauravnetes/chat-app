import os
import base64

def generate_jwt_secret(length_bytes=32):
    """
    Generates a strong, random JWT secret using a CSPRNG.
    A length of 32 bytes (256 bits) is generally recommended for HMAC-SHA256.
    """
    secret_bytes = os.urandom(length_bytes)
    return base64.urlsafe_b64encode(secret_bytes).decode('utf-8')

# Generate a secret
jwt_secret = generate_jwt_secret()
print(f"Generated JWT Secret: {jwt_secret}")
print(f"Secret Length (base64 encoded): {len(jwt_secret)} characters")