use diesel::prelude::*;
use pwhash::bcrypt;

use crate::models::{
    User,
    NewUser,
};
use crate::schema::users;



pub fn create_user(
    conn: &mut SqliteConnection,
    username: &str,
    password: &str,
) -> User {
    let hash = bcrypt::hash(password).unwrap();

    let new_user = NewUser {
        username,
        password: hash.as_str(),
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .returning(User::as_returning())
        .get_result(conn)
        .expect("Error saving new user")
}


pub fn login_user(
    conn: &mut SqliteConnection,
    username: &str,
    password: &str,
) -> Option<bool> {
    let users = get_all_users(conn);

    if let Some(user) = users.iter().find(|&user| user.username == username) {
        let valid = bcrypt::verify(password, user.password.as_str());
        if !valid {
            return None;
        }

        return Some(true);
    }

    None
}


pub fn get_all_users(
    conn: &mut SqliteConnection,
) -> Vec<User> {
    let users = users::table.load(conn)
        .expect("Error loading users");

    users
}
