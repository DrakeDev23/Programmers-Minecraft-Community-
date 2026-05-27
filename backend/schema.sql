CREATE DATABASE IF NOT EXISTS null_smp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE null_smp;

CREATE TABLE IF NOT EXISTS admin_users (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username     VARCHAR(64)  NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    display_name VARCHAR(128),
    is_active    TINYINT(1)   NOT NULL DEFAULT 1,
    last_login   DATETIME,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS members (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(64) NOT NULL UNIQUE,
    role       ENUM('Owner','Admin','Member') NOT NULL DEFAULT 'Member',
    is_active  TINYINT(1)  NOT NULL DEFAULT 1,
    joined_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS announcements (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    admin_id   INT UNSIGNED,
    title      VARCHAR(200) NOT NULL DEFAULT 'Untitled',
    message    TEXT         NOT NULL,
    tag        ENUM('general','update','maintenance','event','urgent') NOT NULL DEFAULT 'general',
    is_edited  TINYINT(1)   NOT NULL DEFAULT 0,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS whitelist_applications (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(64)  NOT NULL,
    note        TEXT,
    status      ENUM('pending','accepted','denied') NOT NULL DEFAULT 'pending',
    applied_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME
) ENGINE=InnoDB;

INSERT INTO admin_users (username, password, display_name, email)
VALUES ('admin', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@nullsmp.com')
ON DUPLICATE KEY UPDATE username = username;

INSERT IGNORE INTO members (username, role, is_active, joined_at) VALUES
('drakedev',   'Owner',  1, '2024-01-10'),
('veloxn',     'Admin',  1, '2024-02-03'),
('nullbyte',   'Member', 1, '2024-03-15'),
('hexcraft',   'Member', 0, '2024-04-22'),
('stackpixel', 'Member', 1, '2024-05-08'),
('rustling',   'Member', 1, '2024-06-01');

INSERT IGNORE INTO whitelist_applications (username, note, status, applied_at) VALUES
('codebreaker99', 'Full-stack dev, loves redstone automation', 'pending', '2025-05-09'),
('pixelforge',    'Game dev, plays since 2012',                'pending', '2025-05-08'),
('asyncawait',    'Backend engineer, big into infra builds',   'pending', '2025-05-07');