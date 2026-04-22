CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Note: In a real production environment, passwords MUST be hashed (e.g., using bcrypt).
-- This script contains the plaintext password as requested for project initialization.
INSERT INTO admin_users (username, password_hash)
VALUES ('tyemi66@gmail.com', '@@sarah2026##');
