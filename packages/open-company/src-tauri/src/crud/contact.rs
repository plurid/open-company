use diesel::prelude::*;

use crate::models::{
    Contact,
    NewContact,
};



pub fn create_contact(
    conn: &mut SqliteConnection,
    name: &str,
    phone: &str,
    email: &str,
) -> Contact {
    use crate::schema::contacts;

    let new_contact = NewContact {
        name,
        phone,
        email,
    };

    diesel::insert_into(contacts::table)
        .values(&new_contact)
        .returning(Contact::as_returning())
        .get_result(conn)
        .expect("Error saving new contact")
}
