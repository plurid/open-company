use xml_doc::{Document, Element};
use std::collections::HashSet;

use crate::entities::invoice::Invoice;



pub struct UblWriter {
    NS_INVOICE: &'static str,
    NS_CREDIT_NOTE: &'static str,
    NS_CAC: &'static str,
    NS_CBC: &'static str,
}

impl UblWriter {
    pub fn new() -> Self {
        const NS_INVOICE: &'static str = "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2";
        const NS_CREDIT_NOTE: &'static str = "urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2";
        const NS_CAC: &'static str = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2";
        const NS_CBC: &'static str = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";

        Self {
            NS_INVOICE,
            NS_CREDIT_NOTE,
            NS_CAC,
            NS_CBC,
        }
    }

    pub fn export(
        &self,
        invoice: Invoice,
    ) {
        const DATA: &'static str = r#"<?xml version="1.0" encoding="utf-8"?>"#;
        let mut doc = Document::parse_str(DATA).unwrap();

        let root_element_name = if self.is_credit_note_profile(invoice.clone()) {
            String::from("CreditNote")
        } else {
            String::from("Invoice")
        };

        let XMLNS_TYPE = if self.is_credit_note_profile(invoice.clone()) {
            self.NS_CREDIT_NOTE
        } else {
            self.NS_INVOICE
        };

        let invoice_xml = Element::build(&mut doc, root_element_name)
            .attribute("xmlns", XMLNS_TYPE)
            .attribute("xmlns:cac", self.NS_CAC)
            .attribute("xmlns:cbc", self.NS_CBC)
            .finish();

        let root = Element::as_node(&invoice_xml);
        let _ = doc.push_root_node(root).unwrap();
    }


    /// Whether document should use invoice or credit note profiles
    pub fn is_credit_note_profile(
        &self,
        invoice: Invoice,
    ) -> bool {
        let invoice_type = invoice.getType().unwrap();

        let credit_note_types: HashSet<u16> = [
            invoice.TYPE_CREDIT_NOTE_RELATED_TO_GOODS_OR_SERVICES,
            invoice.TYPE_CREDIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS,
            invoice.TYPE_CREDIT_NOTE,
            invoice.TYPE_FACTORED_CREDIT_NOTE,
            invoice.TYPE_FORWARDERS_CREDIT_NOTE,
        ]
        .iter()
        .cloned()
        .collect();

        credit_note_types.contains(&invoice_type)
    }
}
