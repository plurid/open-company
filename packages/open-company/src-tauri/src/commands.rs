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
pub fn get_company(
    owned_by: &str,
    id: i32,
    state: tauri::State<database::DatabaseState>,
) -> models::Company {
    let connection = &mut get_connection(state);

    let company = company::get_company(
        connection,
        owned_by,
        id,
    );

    company
}


#[tauri::command]
pub fn get_companies(
    owned_by: &str,
    state: tauri::State<database::DatabaseState>,
) -> Vec<models::Company> {
    let connection = &mut get_connection(state);

    let companies = company::get_user_companies(
        connection,
        owned_by,
    );

    companies
}


#[tauri::command]
pub fn get_items(
    owned_by: &str,
    state: tauri::State<database::DatabaseState>,
) -> Vec<models::Item> {
    let connection = &mut get_connection(state);

    let items = item::get_user_items(
        connection,
        owned_by,
    );

    items
}


#[tauri::command]
pub fn get_item(
    owned_by: &str,
    id: i32,
    state: tauri::State<database::DatabaseState>,
) -> models::Item {
    let connection = &mut get_connection(state);

    let item = item::get_item(
        connection,
        owned_by,
        id,
    );

    item
}


#[tauri::command]
pub fn update_item(
    owned_by: &str,
    id: i32,
    name: &str,
    price: f32,
    state: tauri::State<database::DatabaseState>,
) -> models::Item {
    let connection = &mut get_connection(state);

    let item = item::update_item(
        connection,
        owned_by,
        id,
        name,
        price,
    );

    item
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
    fields: &str,
    use_for_invoicing: bool,
    state: tauri::State<database::DatabaseState>,
) -> models::Company {
    let connection = &mut get_connection(state);

    let company = company::create_company(
        connection,
        owned_by,
        name,
        fields,
        use_for_invoicing,
    );

    company
}


#[tauri::command]
pub fn update_company(
    id: i32,
    owned_by: &str,
    name: &str,
    fields: &str,
    use_for_invoicing: bool,
    state: tauri::State<database::DatabaseState>,
) -> models::Company {
    let connection = &mut get_connection(state);

    let company = company::update_company(
        connection,
        owned_by,
        id,
        name,
        fields,
        use_for_invoicing,
    );

    company
}


#[tauri::command]
pub fn delete_company(
    owned_by: &str,
    id: i32,
    state: tauri::State<database::DatabaseState>,
) -> PureResponse {
    let connection = &mut get_connection(state);

    company::delete_company(
        connection,
        owned_by,
        id,
    );

    PureResponse {
        status: true,
    }
}


#[tauri::command]
pub fn generate_new_company_template(
    owned_by: &str,
    name: &str,
    fields: &str,
    as_default: bool,
    state: tauri::State<database::DatabaseState>,
) -> models::CompanyTemplate {
    let connection = &mut get_connection(state);

    let company_template = company::create_company_template(
        connection,
        owned_by,
        name,
        fields,
        as_default,
    );

    company_template
}


#[tauri::command]
pub fn delete_company_template(
    owned_by: &str,
    id: i32,
    state: tauri::State<database::DatabaseState>,
) -> PureResponse {
    let connection = &mut get_connection(state);

    company::delete_company_template(
        connection,
        owned_by,
        id,
    );

    PureResponse {
        status: true,
    }
}


#[tauri::command]
pub fn get_company_templates(
    owned_by: &str,
    state: tauri::State<database::DatabaseState>,
) -> Vec<models::CompanyTemplate> {
    let connection = &mut get_connection(state);

    let company_templates = company::get_company_templates(
        connection,
        owned_by,
    );

    company_templates
}


#[tauri::command]
pub fn generate_new_item(
    owned_by: &str,
    name: &str,
    price: f32,
    state: tauri::State<database::DatabaseState>,
) -> models::Item {
    let connection = &mut get_connection(state);

    let item = item::create_item(
        connection,
        owned_by,
        name,
        price,
    );

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
