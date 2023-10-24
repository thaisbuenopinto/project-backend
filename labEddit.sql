-- Active: 1697922997822@@127.0.0.1@3306

CREATE TABLE
    if NOT EXISTS users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        'u001',
        'thais',
        'thais@email.com',
        '56789109',
        'ADMIN'
    );

CREATE TABLE
    if NOT EXISTS posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        amount_comments INTEGER,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    if NOT EXISTS likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT NOT NULL,
        updated_at TEXT,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
    );