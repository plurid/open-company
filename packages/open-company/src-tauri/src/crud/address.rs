use diesel::prelude::*;

use crate::models::{
    Address,
    NewAddress,
};



pub fn create_address(
    conn: &mut SqliteConnection,
    value: &str,
    country: &str,
    location: &str,
) -> Address {
    use crate::schema::addresses;

    let new_address = NewAddress {
        value,
        country,
        location,
    };

    diesel::insert_into(addresses::table)
        .values(&new_address)
        .returning(Address::as_returning())
        .get_result(conn)
        .expect("Error saving new address")
}
