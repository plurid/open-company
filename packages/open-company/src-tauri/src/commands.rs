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



#[tauri::command]
pub fn start_database(
    name: &str,
    location: &str,
) {
    println!("generating database: {} {}", name, location);
}


#[tauri::command]
pub fn generate_new_user(
    username: &str,
    password: &str,
) -> models::User {
    let connection = &mut database::establish_db_connection();

    let user = user::create_user(connection, username, password);

    user
}


#[tauri::command]
pub fn generate_new_address(
    value: &str,
    country: &str,
    location: &str,
) -> models::Address {
    let connection = &mut database::establish_db_connection();

    let address = address::create_address(connection, value, country, location);

    address
}


#[tauri::command]
pub fn generate_new_contact(
    name: &str,
    phone: &str,
    email: &str,
) -> models::Contact {
    let connection = &mut database::establish_db_connection();

    let contact = contact::create_contact(connection, name, phone, email);

    contact
}


#[tauri::command]
pub fn generate_new_company(
    name: &str,
) -> models::Company {
    let connection = &mut database::establish_db_connection();

    let company = company::create_company(connection, name);

    company
}


#[tauri::command]
pub fn generate_new_item(
    name: &str,
) -> models::Item {
    let connection = &mut database::establish_db_connection();

    let item = item::create_item(connection, name);

    item
}


#[tauri::command]
pub fn generate_new_invoice(
    invoice_from: &str,
    invoice_to: &str,
) -> models::Invoice {
    let connection = &mut database::establish_db_connection();

    let invoice = invoice::create_invoice(connection, invoice_from, invoice_to);

    invoice
}
