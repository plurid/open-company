use diesel::prelude::*;

use crate::models::{
    Company,
    NewCompany,
};



pub fn create_company(
    conn: &mut SqliteConnection,
    owned_by: &str,
    name: &str,
    identification: &str,
    address: &str,
    country: &str,
    contact: &str,
    use_for_invoicing: bool,
) -> Company {
    use crate::schema::companies;

    let new_company = NewCompany {
        owned_by,
        name,
        identification,
        address,
        country,
        contact,
        use_for_invoicing,
    };

    diesel::insert_into(companies::table)
        .values(&new_company)
        .returning(Company::as_returning())
        .get_result(conn)
        .expect("Error saving new company")
}
