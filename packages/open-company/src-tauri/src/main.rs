// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_mut)]


use std::sync::Mutex;
use std::path::PathBuf;

use tauri::Invoke;

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
mod invoicer;
mod models;
mod schema;
mod commands;



fn setup_app(
    config_dir: PathBuf,
) {
}

fn commands_handler() -> impl Fn(Invoke) {
    tauri::generate_handler![
        commands::show_main_window,
        commands::check_database_exists,
        commands::check_users_exist,
        commands::start_database,
        commands::generate_new_user,
        commands::login_user,
        commands::generate_new_address,
        commands::generate_new_contact,
        commands::generate_new_company,
        commands::update_company,
        commands::delete_company,
        commands::generate_new_company_template,
        commands::delete_company_template,
        commands::get_company_templates,
        commands::generate_new_item,
        commands::generate_new_invoice,
        commands::get_users,
        commands::get_company,
        commands::get_companies,
        commands::get_items,
        commands::get_item,
        commands::update_item,
    ]
}


fn main() {
    let commands = commands_handler();

    tauri::Builder::default()
        .setup(|app| {
            let config_dir = app.path_resolver().app_config_dir().unwrap();
            setup_app(config_dir);
            Ok(())
        })
        .manage(database::DatabaseState(
            Mutex::new(database::Database::new(""))
        ))
        .invoke_handler(commands)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
