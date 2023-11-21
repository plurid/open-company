use diesel::prelude::*;

use crate::models::{
    Company,
    NewCompany,
    CompanyTemplate,
    NewCompanyTemplate,
};
use crate::schema::{
    companies,
    company_templates,
};



pub fn create_company(
    connection: &mut SqliteConnection,
    owned_by: &str,
    name: &str,
    fields: &str,
    use_for_invoicing: bool,
) -> Company {
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
    as_default: bool,
) -> CompanyTemplate {
    let new_company_template = NewCompanyTemplate {
        owned_by,
        name,
        fields,
        as_default,
    };

    if as_default {
        diesel::update(company_templates::table)
            .filter(company_templates::owned_by.eq(owned_by))
            .set(company_templates::as_default.eq(false))
            .execute(connection)
            .expect("Error setting company template as default");
    }

    diesel::insert_into(company_templates::table)
        .values(&new_company_template)
        .returning(CompanyTemplate::as_returning())
        .get_result(connection)
        .expect("Error saving new company template")
}


pub fn get_company_templates(
    connection: &mut SqliteConnection,
    user_id: &str,
) -> Vec<CompanyTemplate> {
    use crate::schema::company_templates::owned_by;

    let company_templates = company_templates::table
        .filter(owned_by.eq(user_id))
        .load(connection)
        .expect("Error loading company templates");

    company_templates
}
