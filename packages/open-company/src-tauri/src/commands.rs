use serde;
use tauri::Manager;

use crate::config;
use crate::database;
use crate::models;
use crate::crud::{
    user,
    address,
    contact,
    company,
    item,
    invoice,
};



#[derive(serde::Serialize)]
pub struct PureResponse {
    status: bool,
}

#[derive(serde::Serialize)]
pub struct StringResponse {
    status: bool,
    data: String,
}



#[tauri::command]
pub async fn show_main_window(
    window: tauri::Window,
) {
    window.get_window("main").unwrap().show().unwrap();
}


#[tauri::command]
pub fn check_database_exists(
    app_handle: tauri::AppHandle,
    state: tauri::State<database::DatabaseState>,
) -> StringResponse {
    let config = config::get_config(app_handle);

    match config {
        Some(config) => {
            let mut state_guard = state.0.lock().unwrap();
            state_guard.update_location(config.database_location.as_str());

            return StringResponse {
                status: true,
                data: config.database_location,
            };
        }
        None => {
            return StringResponse {
                status: false,
                data: "".to_string(),
            };
        }
    }
}


#[tauri::command]
pub fn check_users_exist(
    state: tauri::State<database::DatabaseState>,
) -> PureResponse {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let users = user::get_all_users(connection);

    if users.len() == 0 {
        return PureResponse {
            status: false,
        };
    }

    PureResponse {
        status: true,
    }
}


#[tauri::command]
pub fn start_database(
    name: &str,
    location: &str,
    state: tauri::State<database::DatabaseState>,
    app_handle: tauri::AppHandle,
) -> PureResponse {
    let mut state_guard = state.0.lock().unwrap();

    state_guard.update_location(location);
    state_guard.run_migrations();

    config::update_config(app_handle, config::Config {
        database_location: location.to_string(),
    });

    PureResponse {
        status: true,
    }
}


#[tauri::command]
pub fn generate_new_user(
    username: &str,
    password: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::User {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let user = user::create_user(connection, username, password);

    user
}


#[tauri::command]
pub fn generate_new_address(
    value: &str,
    country: &str,
    location: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Address {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let address = address::create_address(connection, value, country, location);

    address
}


#[tauri::command]
pub fn generate_new_contact(
    name: &str,
    phone: &str,
    email: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Contact {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let contact = contact::create_contact(connection, name, phone, email);

    contact
}


#[tauri::command]
pub fn generate_new_company(
    name: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Company {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let company = company::create_company(connection, name);

    company
}


#[tauri::command]
pub fn generate_new_item(
    name: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Item {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let item = item::create_item(connection, name);

    item
}


#[tauri::command]
pub fn generate_new_invoice(
    invoice_from: &str,
    invoice_to: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Invoice {
    let mut state_guard = state.0.lock().unwrap();
    let connection = &mut state_guard.get_connection();

    let invoice = invoice::create_invoice(connection, invoice_from, invoice_to);

    invoice
}
