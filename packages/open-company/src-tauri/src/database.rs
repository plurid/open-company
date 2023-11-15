use std::sync::Mutex;

use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use diesel_migrations::{
    embed_migrations,
    EmbeddedMigrations,
    MigrationHarness,
};



const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");


pub struct Database {
    location: String,
}

impl Database {
    pub fn new(location: &str) -> Database  {
        Database {
            location: location.to_string()
        }
    }

    pub fn update_location(&mut self, location: &str) {
        self.location = location.to_string();
    }

    pub fn get_connection(&self) -> SqliteConnection {
        let connection = SqliteConnection::establish(&self.location)
            .unwrap_or_else(|_| panic!("Error connecting to {}", &self.location));

        connection
    }

    pub fn run_migrations(&self) {
        let mut connection = self.get_connection();

        connection.run_pending_migrations(MIGRATIONS).unwrap();
    }
}

pub struct DatabaseState(pub Mutex<Database>);
