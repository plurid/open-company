use crate::db;
use crate::models;
use crate::user;



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
    let connection = &mut db::establish_db_connection();

    let user = user::create_user(connection, username, password);
    println!("\nsaved user {} with id {}", username, user.id);

    user
}
