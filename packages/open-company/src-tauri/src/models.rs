use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::{
    users,
    addresses,
    contacts,
    companies,
    company_templates,
    items,
    invoices,
};



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct PublicUser {
    pub id: i32,
    pub username: String,
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password: &'a str,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::addresses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Address {
    pub id: i32,
    pub value: String,
    pub country: String,
    pub location: String,
}

#[derive(Insertable)]
#[diesel(table_name = addresses)]
pub struct NewAddress<'a> {
    pub value: &'a str,
    pub country: &'a str,
    pub location: &'a str,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::contacts)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Contact {
    pub id: i32,
    pub name: String,
    pub phone: String,
    pub email: String,
}

#[derive(Insertable)]
#[diesel(table_name = contacts)]
pub struct NewContact<'a> {
    pub name: &'a str,
    pub phone: &'a str,
    pub email: &'a str,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::companies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Company {
    pub id: i32,
    pub owned_by: String,
    pub name: String,
    pub fields: String,
    pub use_for_invoicing: bool,
}

#[derive(Debug, Deserialize, Serialize)]
struct CompanyField {
    name: String,
    #[serde(rename = "type")]
    field_type: String,
    value: CompanyFieldValue,
    required: bool,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
enum CompanyFieldValue {
    StringValue(String),
    NumberValue(i64),
    BooleanValue(bool),
}

#[derive(Insertable)]
#[diesel(table_name = companies)]
pub struct NewCompany<'a> {
    pub owned_by: &'a str,
    pub name: &'a str,
    pub fields: &'a str,
    pub use_for_invoicing: bool,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::company_templates)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CompanyTemplate {
    pub id: i32,
    pub owned_by: String,
    pub name: String,
    pub fields: String,
    pub as_default: bool,
}

#[derive(Insertable)]
#[diesel(table_name = company_templates)]
pub struct NewCompanyTemplate<'a> {
    pub owned_by: &'a str,
    pub name: &'a str,
    pub fields: &'a str,
    pub as_default: bool,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::items)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Item {
    pub id: i32,
    pub owned_by: String,
    pub name: String,
    pub price: f32,
}

#[derive(Insertable)]
#[diesel(table_name = items)]
pub struct NewItem<'a> {
    pub owned_by: &'a str,
    pub name: &'a str,
    pub price: f32,
}



#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::invoices)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Invoice {
    pub id: i32,
    pub invoice_from: String,
    pub invoice_to: String,
}

#[derive(Insertable)]
#[diesel(table_name = invoices)]
pub struct NewInvoice<'a> {
    pub invoice_from: &'a str,
    pub invoice_to: &'a str,
}
