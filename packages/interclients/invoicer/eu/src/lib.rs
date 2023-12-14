#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]



pub mod entities {
    pub mod allowance_or_charge;
    pub mod attachment;
    pub mod attribute;
    pub mod delivery;
    pub mod identifier;
    pub mod invoice_line;
    pub mod invoice_reference;
    pub mod invoice;
    pub mod party;
}
pub mod models {
    pub mod invoice_totals;
    pub mod vat_breakdown;
}
pub mod payments {
    pub mod card;
    pub mod mandate;
    pub mod payment;
    pub mod transfer;
}
pub mod presets {
    pub mod cius_at_gov;
    pub mod cius_at_nat;
    pub mod cius_es_face;
    pub mod cius_it;
    pub mod cius_ro;
    pub mod nlcius;
    pub mod peppol;
}
pub mod readers {
    pub mod ubl_reader;
}
pub mod writers {
    pub mod ubl_writer;
}

pub mod invoicer;
