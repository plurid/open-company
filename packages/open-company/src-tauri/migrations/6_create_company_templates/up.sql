CREATE TABLE company_templates (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    owned_by TEXT NOT NULL,
    name TEXT NOT NULL,
    fields TEXT NOT NULL
)
