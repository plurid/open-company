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


pub fn update_company(
    connection: &mut SqliteConnection,
    owned_by: &str,
    id: i32,
    name: &str,
    fields: &str,
    use_for_invoicing: bool,
) -> Company {
    diesel::update(companies::table
        .filter(companies::owned_by.eq(owned_by))
        .filter(companies::id.eq(id))
    )
        .set((
            companies::name.eq(name),
            companies::fields.eq(fields),
            companies::use_for_invoicing.eq(use_for_invoicing),
        ))
        .execute(connection)
        .expect("Error updating company");

    let company = companies::table
        .filter(companies::owned_by.eq(owned_by))
        .filter(companies::id.eq(id))
        .first(connection)
        .expect("Error loading company");

    company
}


pub fn delete_company(
    connection: &mut SqliteConnection,
    owned_by: &str,
    id: i32,
) {
    diesel::delete(companies::table
        .filter(companies::owned_by.eq(owned_by))
        .filter(companies::id.eq(id))
    )
        .execute(connection)
        .expect("Error deleting company");
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


pub fn delete_company_template(
    connection: &mut SqliteConnection,
    owned_by: &str,
    id: i32,
) {
    diesel::delete(company_templates::table
        .filter(company_templates::owned_by.eq(owned_by))
        .filter(company_templates::id.eq(id))
    )
        .execute(connection)
        .expect("Error deleting company template");
}


pub fn get_company(
    connection: &mut SqliteConnection,
    owned_by: &str,
    id: i32,
) -> Company {
    let company = companies::table
        .filter(companies::owned_by.eq(owned_by))
        .filter(companies::id.eq(id))
        .first(connection)
        .expect("Error loading company");

    company
}


pub fn get_user_companies(
    connection: &mut SqliteConnection,
    owned_by: &str,
) -> Vec<Company> {
    let companies = companies::table
        .filter(companies::owned_by.eq(owned_by))
        .load(connection)
        .expect("Error loading companies");

    companies
}
