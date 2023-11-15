use diesel::prelude::*;

use crate::models::{
    Invoice,
    NewInvoice,
};



pub fn create_invoice(
    conn: &mut SqliteConnection,
    invoice_from: &str,
    invoice_to: &str,
) -> Invoice {
    use crate::schema::invoices;

    let new_invoice = NewInvoice {
        invoice_from,
        invoice_to,
    };

    diesel::insert_into(invoices::table)
        .values(&new_invoice)
        .returning(Invoice::as_returning())
        .get_result(conn)
        .expect("Error saving new invoice")
}
