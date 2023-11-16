// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_mut)]


use std::sync::Mutex;
use std::path::PathBuf;


mod config;
mod database;
mod crud {
    pub mod user;
    pub mod address;
    pub mod contact;
    pub mod company;
    pub mod item;
    pub mod invoice;
}
mod models;
mod schema;
mod commands;



fn setup_app(
    config_dir: PathBuf,
) {
}


fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let config_dir = app.path_resolver().app_config_dir().unwrap();
            setup_app(config_dir);
            Ok(())
        })
        .manage(database::DatabaseState(
            Mutex::new(database::Database::new(""))
        ))
        .invoke_handler(tauri::generate_handler![
            commands::show_main_window,
            commands::start_database,
            commands::generate_new_user,
            commands::generate_new_address,
            commands::generate_new_contact,
            commands::generate_new_company,
            commands::generate_new_item,
            commands::generate_new_invoice,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
