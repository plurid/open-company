use diesel::prelude::*;
use pwhash::bcrypt;

use crate::models::{
    User,
    NewUser,
};



pub fn create_user(
    conn: &mut SqliteConnection,
    username: &str,
    password: &str,
) -> User {
    use crate::schema::users;

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
