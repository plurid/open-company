// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[allow(dead_code)]
#[allow(unused_variables)]
#[allow(unused_mut)]


mod db;
mod user;
mod models;
mod schema;
mod commands;



fn setup_app() {
    db::init();
}


fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            setup_app();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::start_database,
            commands::generate_new_user,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
