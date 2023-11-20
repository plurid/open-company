use diesel::prelude::*;

use crate::models::{
    Company,
    NewCompany,
    CompanyTemplate,
    NewCompanyTemplate,
};



pub fn create_company(
    connection: &mut SqliteConnection,
    owned_by: &str,
    name: &str,
    fields: &str,
    use_for_invoicing: bool,
) -> Company {
    use crate::schema::companies;

    let new_company = NewCompany {
        owned_by,
        name,
        fields,
        use_for_invoicing,
    };

    diesel::insert_into(companies::table)
        .values(&new_company)
        .returning(Company::as_returning())
        .get_result(connection)
        .expect("Error saving new company")
}

pub fn create_company_template(
    connection: &mut SqliteConnection,
    owned_by: &str,
    name: &str,
    fields: &str,
) -> CompanyTemplate {
    use crate::schema::company_templates;

    let new_company_template = NewCompanyTemplate {
        owned_by,
        name,
        fields,
    };

    diesel::insert_into(company_templates::table)
        .values(&new_company_template)
        .returning(CompanyTemplate::as_returning())
        .get_result(connection)
        .expect("Error saving new company template")
}
