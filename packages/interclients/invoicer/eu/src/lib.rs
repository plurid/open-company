#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]


use xml_doc::{Document, Element};


pub mod invoice;
pub mod ubl_writer;



pub struct Invoicer {
    doc: Document,
    invoice: Element,
}

impl Invoicer {
    pub fn new() -> Self {
        const DATA: &'static str = r#"<?xml version="1.0" encoding="utf-8"?>"#;
        let mut doc = Document::parse_str(DATA).unwrap();

        let invoice = Element::build(&mut doc, "Invoice")
            .attribute("xmlns", "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2")
            .attribute(
                "xmlns:cac",
                "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
            )
            .attribute(
                "xmlns:cbc",
                "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
            )
            .finish();

        let root = Element::as_node(&invoice);
        let _ = doc.push_root_node(root).unwrap();

        let mut invoicer = Invoicer {
            doc,
            invoice,
        };

        invoicer.add_customization_id();
        invoicer.add_profile_id();

        invoicer
    }

    pub fn add_customization_id(&mut self) {
        let _customization_id = Element::build(&mut self.doc, "cbc:CustomizationID")
            .text_content(
                "urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0",
            )
            .push_to(self.invoice);
    }

    pub fn add_profile_id(&mut self) {
        let _profile_id = Element::build(&mut self.doc, "cbc:ProfileID")
            .text_content("urn:fdc:peppol.eu:2017:poacc:billing:01:1.0")
            .push_to(self.invoice);
    }

    pub fn write_to_file(&mut self, filename: &str) {
        let xml_string = self.get_xml_string();
        std::fs::write(filename, xml_string).expect("Failed to write to file");
    }

    pub fn get_xml_string(&mut self) -> String {
        let mut xml_string = self.doc.write_str().unwrap();
        xml_string.push_str("\n");

        xml_string
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let mut invoicer = Invoicer::new();
        invoicer.write_to_file("invoice.xml");

        assert_eq!(true, true);
    }
}
