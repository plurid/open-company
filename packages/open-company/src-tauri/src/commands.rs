use serde;
use tauri::Manager;
use diesel::sqlite::SqliteConnection;

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



fn get_connection(
    state: tauri::State<database::DatabaseState>,
) -> SqliteConnection {
    let mut state_guard = state.0.lock().unwrap();

    state_guard.get_connection()
}


#[tauri::command]
pub fn check_users_exist(
    state: tauri::State<database::DatabaseState>,
) -> PureResponse {
    let connection = &mut get_connection(state);

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
) -> PureResponse {
    let connection = &mut get_connection(state);

    let _ = user::create_user(connection, username, password);

    PureResponse {
        status: true,
    }
}


#[tauri::command]
pub fn get_users(
    state: tauri::State<database::DatabaseState>,
) -> Vec<models::PublicUser> {
    let connection = &mut get_connection(state);

    let users = user::get_all_users(connection);

    let public_users = users.iter().map(|user| {
        models::PublicUser {
            id: user.id,
            username: user.username.clone(),
        }
    }).collect();

    public_users
}


#[tauri::command]
pub fn login_user(
    username: &str,
    password: &str,
    state: tauri::State<database::DatabaseState>,
) -> PureResponse {
    let connection = &mut get_connection(state);

    let logged_in = user::login_user(connection, username, password);

    match logged_in {
        Some(_) => {
            return PureResponse {
                status: true,
            };
        }
        None => {
            return PureResponse {
                status: false,
            };
        }
    }
}


#[tauri::command]
pub fn generate_new_address(
    value: &str,
    country: &str,
    location: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Address {
    let connection = &mut get_connection(state);

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
    let connection = &mut get_connection(state);

    let contact = contact::create_contact(connection, name, phone, email);

    contact
}


#[tauri::command]
pub fn generate_new_company(
    owned_by: &str,
    name: &str,
    identification: &str,
    address: &str,
    country: &str,
    contact: &str,
    use_for_invoicing: bool,
    state: tauri::State<database::DatabaseState>,
) -> models::Company {
    let connection = &mut get_connection(state);

    let company = company::create_company(
        connection,
        owned_by,
        name,
        identification,
        address,
        country,
        contact,
        use_for_invoicing,
    );

    company
}


#[tauri::command]
pub fn generate_new_item(
    name: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Item {
    let connection = &mut get_connection(state);

    let item = item::create_item(connection, name);

    item
}


#[tauri::command]
pub fn generate_new_invoice(
    invoice_from: &str,
    invoice_to: &str,
    state: tauri::State<database::DatabaseState>,
) -> models::Invoice {
    let connection = &mut get_connection(state);

    let invoice = invoice::create_invoice(connection, invoice_from, invoice_to);

    invoice
}
