CREATE TABLE companies (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    owned_by TEXT NOT NULL,
    name TEXT NOT NULL,
    identification TEXT NOT NULL,
    address TEXT NOT NULL,
    country TEXT NOT NULL,
    contact TEXT NOT NULL,
    use_for_invoicing BOOLEAN NOT NULL
)
