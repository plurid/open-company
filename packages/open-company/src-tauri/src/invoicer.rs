use invoicer_eu::entities;



pub fn generate_invoice() {
    let mut invoice = entities::invoice::Invoice::new(
        Some("1234567890".to_string()),
    );
}
