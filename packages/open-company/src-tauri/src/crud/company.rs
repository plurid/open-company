use diesel::prelude::*;

use crate::models::{
    Company,
    NewCompany,
};



pub fn create_company(
    conn: &mut SqliteConnection,
    name: &str,
) -> Company {
    use crate::schema::companies;

    let new_company = NewCompany {
        name,
    };

    diesel::insert_into(companies::table)
        .values(&new_company)
        .returning(Company::as_returning())
        .get_result(conn)
        .expect("Error saving new company")
}