CREATE TABLE items (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    owned_by TEXT NOT NULL,
    name TEXT NOT NULL,
    display TEXT NOT NULL,
    currency TEXT NOT NULL,
    default_quantity REAL NOT NULL,
    price REAL NOT NULL
)
