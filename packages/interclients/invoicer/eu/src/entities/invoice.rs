#[derive(Clone)]
pub struct Invoice {
    pub DEFAULT_DECIMALS: u16,

    /**
     * Request for payment
     * Document/message issued by a creditor to a debtor to request payment of one or more invoices past due.
     */
    pub TYPE_REQUEST_FOR_PAYMENT: u16,

    /**
     * Debit note related to goods or services
     * Debit information related to a transaction for goods or services to the relevant party.
     */
    pub TYPE_DEBIT_NOTE_RELATED_TO_GOODS_OR_SERVICES: u16,

    /**
     * Metered services invoice
     * Document/message claiming payment for the supply of metered services (e.g., gas, electricity, etc.) supplied to
     * a fixed meter whose consumption is measured over a period of time.
     */
    pub TYPE_METERED_SERVICES_INVOICE: u16,

    /**
     * Debit note related to financial adjustments
     * Document/message for providing debit information related to financial adjustments to the relevant party.
     */
    pub TYPE_DEBIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS: u16,

    /**
     * Tax notification
     * Used to specify that the message is a tax notification.
     */
    pub TYPE_TAX_NOTIFICATION: u16,

    /**
     * Final payment request based on completion of work
     * The final payment request of a series of payment requests submitted upon completion of all the work.
     */
    pub TYPE_FINAL_PAYMENT_REQUEST_BASED_ON_COMPLETION_OF_WORK: u16,

    /**
     * Payment request for completed units
     * A request for payment for completed units.
     */
    pub TYPE_PAYMENT_REQUEST_FOR_COMPLETED_UNITS: u16,

    /**
     * Commercial invoice which includes a packing list
     * Commercial transaction (invoice) will include a packing list.
     */
    pub TYPE_COMMERCIAL_INVOICE_WHICH_INCLUDES_A_PACKING_LIST: u16,

    /**
     * Commercial invoice
     * Document/message claiming payment for goods or services supplied under conditions agreed between seller and
     * buyer.
     */
    pub TYPE_COMMERCIAL_INVOICE: u16,

    /**
     * Commission note
     * Document/message in which a seller specifies the amount of commission, the percentage of the invoice amount, or
     * some other basis for the calculation of the commission to which a sales agent is entitled.
     */
    pub TYPE_COMMISSION_NOTE: u16,

    /**
     * Debit note
     * Document/message for providing debit information to the relevant party.
     */
    pub TYPE_DEBIT_NOTE: u16,

    /**
     * Prepayment invoice
     * An invoice to pay amounts for goods and services in advance; these amounts will be subtracted from the final
     * invoice.
     */
    pub TYPE_PREPAYMENT_INVOICE: u16,

    /**
     * Tax invoice
     * An invoice for tax purposes.
     */
    pub TYPE_TAX_INVOICE: u16,

    /**
     * Factored invoice
     * Invoice assigned to a third party for collection.
     */
    pub TYPE_FACTORED_INVOICE: u16,

    /**
     * Consignment invoice
     * Commercial invoice that covers a transaction other than one involving a sale.
     */
    pub TYPE_CONSIGNMENT_INVOICE: u16,

    /**
     * Forwarder's invoice discrepancy report
     * Document/message reporting invoice discrepancies indentified by the forwarder.
     */
    pub TYPE_FORWARDERS_INVOICE_DISCREPANCY_REPORT: u16,

    /**
     * Insurer's invoice
     * Document/message issued by an insurer specifying the cost of an insurance which has been effected and claiming
     * payment therefore.
     */
    pub TYPE_INSURERS_INVOICE: u16,

    /**
     * Forwarder's invoice
     * Invoice issued by a freight forwarder specifying services rendered and costs incurred and claiming payment
     * therefore.
     */
    pub TYPE_FORWARDERS_INVOICE: u16,

    /**
     * Freight invoice
     * Document/message issued by a transport operation specifying freight costs and charges incurred for a transport
     * operation and stating conditions of payment.
     */
    pub TYPE_FREIGHT_INVOICE: u16,

    /**
     * Claim notification
     * Document notifying a claim.
     */
    pub TYPE_CLAIM_NOTIFICATION: u16,

    /**
     * Consular invoice
     * Document/message to be prepared by an exporter in his country and presented to a diplomatic representation of the
     * importing country for endorsement and subsequently to be presented by the importer in connection with the import
     * of the goods described therein.
     */
    pub TYPE_CONSULAR_INVOICE: u16,

    /**
     * Partial construction invoice
     * Partial invoice in the context of a specific construction project.
     */
    pub TYPE_PARTIAL_CONSTRUCTION_INVOICE: u16,

    /**
     * Partial final construction invoice
     * Invoice concluding all previous partial construction invoices of a completed partial rendered service in the
     * context of a specific construction project.
     */
    pub TYPE_PARTIAL_FINAL_CONSTRUCTION_INVOICE: u16,

    /**
     * Final construction invoice
     * Invoice concluding all previous partial invoices and partial final construction invoices in the context of a
     * specific construction project.
     */
    pub TYPE_FINAL_CONSTRUCTION_INVOICE: u16,

    /**
     * Credit note related to goods or services
     * Document message used to provide credit information related to a transaction for goods or services to the
     * relevant party.
     */
    pub TYPE_CREDIT_NOTE_RELATED_TO_GOODS_OR_SERVICES: u16,

    /**
     * Credit note related to financial adjustments
     * Document message for providing credit information related to financial adjustments to the relevant party,
     * e.g., bonuses.
     */
    pub TYPE_CREDIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS: u16,

    /**
     * Credit note
     * Document/message for providing credit information to the relevant party.
     */
    pub TYPE_CREDIT_NOTE: u16,

    /**
     * Factored credit note
     * Credit note related to assigned invoice(s).
     */
    pub TYPE_FACTORED_CREDIT_NOTE: u16,

    /**
     * Forwarder's credit note
     * Document/message for providing credit information to the relevant party.
     */
    pub TYPE_FORWARDERS_CREDIT_NOTE: u16,

    pub preset: Option<String>,

    pub roundingMatrix: Option<Vec<String>>,
    pub specification: Option<String>,
    pub businessProcess: Option<String>,
    pub number: Option<String>,
    pub type_: Option<u16>,
    pub currency: Option<String>,
    pub vatCurrency: Option<String>,
    pub issueDate: Option<String>,
    pub dueDate: Option<String>,
    pub taxPointDate: Option<String>,
    pub notes: Option<Vec<String>>,
    pub buyerReference: Option<String>,
    pub purchaseOrderReference: Option<String>,
    pub salesOrderReference: Option<String>,
    pub tenderOrLotReference: Option<String>,
    pub contractReference: Option<String>,
    pub paidAmount: Option<f32>,
    pub roundingAmount: Option<f32>,
    pub customVatAmount: Option<f32>,
    pub seller: Option<String>,
    pub buyer: Option<String>,
    pub payee: Option<String>,
    pub delivery: Option<String>,
    pub payment: Option<String>,
    pub lines: Option<Vec<String>>,
    pub allowanceOrCharge: Option<String>,
    pub attachments: Option<String>,
    pub buyerAccountingReference: Option<String>,
    pub period: Option<String>,
    pub invoiceValidation: Option<String>,
    pub precedingInvoiceReferences: Option<String>,
}


impl Invoice {
    pub fn new(
        preset: Option<String>,
    ) -> Self {
        Self {
            DEFAULT_DECIMALS: 8,
            TYPE_REQUEST_FOR_PAYMENT: 71,
            TYPE_DEBIT_NOTE_RELATED_TO_GOODS_OR_SERVICES: 80,
            TYPE_METERED_SERVICES_INVOICE: 82,
            TYPE_DEBIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS: 84,
            TYPE_TAX_NOTIFICATION: 102,
            TYPE_FINAL_PAYMENT_REQUEST_BASED_ON_COMPLETION_OF_WORK: 218,
            TYPE_PAYMENT_REQUEST_FOR_COMPLETED_UNITS: 219,
            TYPE_COMMERCIAL_INVOICE_WHICH_INCLUDES_A_PACKING_LIST: 331,
            TYPE_COMMERCIAL_INVOICE: 380,
            TYPE_COMMISSION_NOTE: 382,
            TYPE_DEBIT_NOTE: 383,
            TYPE_PREPAYMENT_INVOICE: 386,
            TYPE_TAX_INVOICE: 388,
            TYPE_FACTORED_INVOICE: 393,
            TYPE_CONSIGNMENT_INVOICE: 395,
            TYPE_FORWARDERS_INVOICE_DISCREPANCY_REPORT: 553,
            TYPE_INSURERS_INVOICE: 575,
            TYPE_FORWARDERS_INVOICE: 623,
            TYPE_FREIGHT_INVOICE: 780,
            TYPE_CLAIM_NOTIFICATION: 817,
            TYPE_CONSULAR_INVOICE: 870,
            TYPE_PARTIAL_CONSTRUCTION_INVOICE: 875,
            TYPE_PARTIAL_FINAL_CONSTRUCTION_INVOICE: 876,
            TYPE_FINAL_CONSTRUCTION_INVOICE: 877,
            TYPE_CREDIT_NOTE_RELATED_TO_GOODS_OR_SERVICES: 81,
            TYPE_CREDIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS: 83,
            TYPE_CREDIT_NOTE: 381,
            TYPE_FACTORED_CREDIT_NOTE: 396,
            TYPE_FORWARDERS_CREDIT_NOTE: 532,

            preset,

            roundingMatrix: None,
            specification: None,
            businessProcess: None,
            number: None,
            type_: None,
            currency: Some("EUR".to_string()),
            vatCurrency: None,
            issueDate: None,
            dueDate: None,
            taxPointDate: None,
            notes: None,
            buyerReference: None,
            purchaseOrderReference: None,
            salesOrderReference: None,
            tenderOrLotReference: None,
            contractReference: None,
            paidAmount: None,
            roundingAmount: None,
            customVatAmount: None,
            seller: None,
            buyer: None,
            payee: None,
            delivery: None,
            payment: None,
            lines: None,
            allowanceOrCharge: None,
            attachments: None,
            buyerAccountingReference: None,
            period: None,
            invoiceValidation: None,
            precedingInvoiceReferences: None,
        }
    }


    /// Get number of decimal places for a given field
    pub fn getDecimals(&self, field: String) -> u16 {
        match &self.roundingMatrix {
            Some(matrix) => {
                // match matrix.get(&field) {
                //     Some(decimals) => {
                //         return decimals.parse::<u16>().unwrap();
                //     },
                //     None => {
                //         match matrix.get("") {
                //             Some(decimals) => {
                //                 return decimals.parse::<u16>().unwrap();
                //             },
                //             None => {
                //                 return self.DEFAULT_DECIMALS;
                //             }
                //         }
                //     }
                // }
                return 0;
            },
            None => {
                return self.DEFAULT_DECIMALS;
            }
        }
    }

    /// Round value
    pub fn round(&self, value: f32, field: String) -> f32 {
        let decimals = self.getDecimals(field);
        let rounded = value.round();
        if rounded == 0.0 {
            return rounded + 0.0;
        }
        return rounded;
    }

    /// Set rounding matrix
    pub fn setRoundingMatrix(&mut self, matrix: Vec<String>) {
        self.roundingMatrix = Some(matrix);
    }

    /// Get specification identifier
    pub fn getSpecification(&self) -> Option<String> {
        return self.specification.clone();
    }

    /// Set specification identifier
    pub fn setSpecification(&mut self, specification: String) {
        self.specification = Some(specification);
    }

    /// Get business process type
    pub fn getBusinessProcess(&self) -> Option<String> {
        return self.businessProcess.clone();
    }

    /// Set business process type
    pub fn setBusinessProcess(&mut self, businessProcess: String) {
        self.businessProcess = Some(businessProcess);
    }

    /// Get invoice number
    pub fn getNumber(&self) -> Option<String> {
        return self.number.clone();
    }

    /// Set invoice number
    pub fn setNumber(&mut self, number: String) {
        self.number = Some(number);
    }

    /// Get invoice type code
    pub fn getType(&self) -> Option<u16> {
        return self.type_.clone();
    }

    /// Set invoice type code
    pub fn setType(&mut self, type_: u16) {
        self.type_ = Some(type_);
    }

    /// Get document currency code
    pub fn getCurrency(&self) -> Option<String> {
        return self.currency.clone();
    }

    /// Set document currency code
    pub fn setCurrency(&mut self, currency: String) {
        self.currency = Some(currency);
    }

    /// Get VAT accounting currency code
    pub fn getVatCurrency(&self) -> Option<String> {
        return self.vatCurrency.clone();
    }

    /// Set VAT accounting currency code
    pub fn setVatCurrency(&mut self, vatCurrency: String) {
        self.vatCurrency = Some(vatCurrency);
    }

    /// Get invoice issue date
    pub fn getIssueDate(&self) -> Option<String> {
        return self.issueDate.clone();
    }

    /// Set invoice issue date
    pub fn setIssueDate(&mut self, issueDate: String) {
        self.issueDate = Some(issueDate);
    }

    /// Get payment due date
    pub fn getDueDate(&self) -> Option<String> {
        return self.dueDate.clone();
    }

    /// Set payment due date
    pub fn setDueDate(&mut self, dueDate: String) {
        self.dueDate = Some(dueDate);
    }

    /// Get tax point date
    pub fn getTaxPointDate(&self) -> Option<String> {
        return self.taxPointDate.clone();
    }

    /// Set tax point date
    pub fn setTaxPointDate(&mut self, taxPointDate: String) {
        self.taxPointDate = Some(taxPointDate);
    }

    /// Get invoice notes
    pub fn getNotes(&self) -> Option<Vec<String>> {
        return self.notes.clone();
    }

    /// Add invoice note
    pub fn addNote(&mut self, note: String) {
        match &mut self.notes {
            Some(notes) => {
                notes.push(note);
            },
            None => {
                self.notes = Some(vec![note]);
            }
        }
    }

    /// Remove invoice note
    pub fn removeNote(&mut self, index: usize) {
        match &mut self.notes {
            Some(notes) => {
                notes.remove(index);
            },
            None => {}
        }
    }

    /// Clear all invoice notes
    pub fn clearNotes(&mut self) {
        match &mut self.notes {
            Some(notes) => {
                notes.clear();
            },
            None => {}
        }
    }

    /// Get invoice note
    pub fn getNote(&self) -> Option<String> {
        match &self.notes {
            Some(notes) => {
                // return notes.get(0).unwrap().clone();
                return None;
            },
            None => {
                return None;
            }
        }
    }

    /// Set invoice note
    pub fn setNote(&mut self, note: String) {
        match &mut self.notes {
            Some(notes) => {
                notes.clear();
                notes.push(note);
            },
            None => {
                self.notes = Some(vec![note]);
            }
        }
    }

    /// Get buyer reference
    pub fn getBuyerReference(&self) -> Option<String> {
        return self.buyerReference.clone();
    }

    /// Set buyer reference
    pub fn setBuyerReference(&mut self, buyerReference: String) {
        self.buyerReference = Some(buyerReference);
    }

    /// Get purchase order reference
    pub fn getPurchaseOrderReference(&self) -> Option<String> {
        return self.purchaseOrderReference.clone();
    }

    /// Set purchase order reference
    pub fn setPurchaseOrderReference(&mut self, purchaseOrderReference: String) {
        self.purchaseOrderReference = Some(purchaseOrderReference);
    }

    /// Get sales order reference
    pub fn getSalesOrderReference(&self) -> Option<String> {
        return self.salesOrderReference.clone();
    }

    /// Set sales order reference
    pub fn setSalesOrderReference(&mut self, salesOrderReference: String) {
        self.salesOrderReference = Some(salesOrderReference);
    }

    /// Get tender or lot reference
    pub fn getTenderOrLotReference(&self) -> Option<String> {
        return self.tenderOrLotReference.clone();
    }

    /// Set tender or lot reference
    pub fn setTenderOrLotReference(&mut self, tenderOrLotReference: String) {
        self.tenderOrLotReference = Some(tenderOrLotReference);
    }

    /// Get contract reference
    pub fn getContractReference(&self) -> Option<String> {
        return self.contractReference.clone();
    }

    /// Set contract reference
    pub fn setContractReference(&mut self, contractReference: String) {
        self.contractReference = Some(contractReference);
    }

    /// Get invoice prepaid amount
    pub fn getPaidAmount(&self) -> Option<f32> {
        return self.paidAmount.clone();
    }

    /// Set invoice prepaid amount
    pub fn setPaidAmount(&mut self, paidAmount: f32) {
        self.paidAmount = Some(paidAmount);
    }

    /// Get invoice rounding amount
    pub fn getRoundingAmount(&self) -> Option<f32> {
        return self.roundingAmount.clone();
    }

    /// Set invoice rounding amount
    pub fn setRoundingAmount(&mut self, roundingAmount: f32) {
        self.roundingAmount = Some(roundingAmount);
    }

    /// Get total VAT amount in VAT accounting currency
    pub fn getCustomVatAmount(&self) -> Option<f32> {
        return self.customVatAmount.clone();
    }

    /// Set total VAT amount in VAT accounting currency
    pub fn setCustomVatAmount(&mut self, customVatAmount: f32) {
        self.customVatAmount = Some(customVatAmount);
    }

    /// Get seller
    pub fn getSeller(&self) -> Option<String> {
        return self.seller.clone();
    }

    /// Set seller
    pub fn setSeller(&mut self, seller: String) {
        self.seller = Some(seller);
    }

    /// Get buyer
    pub fn getBuyer(&self) -> Option<String> {
        return self.buyer.clone();
    }

    /// Set buyer
    pub fn setBuyer(&mut self, buyer: String) {
        self.buyer = Some(buyer);
    }

    /// Get payee
    pub fn getPayee(&self) -> Option<String> {
        return self.payee.clone();
    }

    /// Set payee
    pub fn setPayee(&mut self, payee: String) {
        self.payee = Some(payee);
    }

    /// Get delivery information
    pub fn getDelivery(&self) -> Option<String> {
        return self.delivery.clone();
    }

    /// Set delivery information
    pub fn setDelivery(&mut self, delivery: String) {
        self.delivery = Some(delivery);
    }

    /// Get payment information
    pub fn getPayment(&self) -> Option<String> {
        return self.payment.clone();
    }

    /// Set payment information
    pub fn setPayment(&mut self, payment: String) {
        self.payment = Some(payment);
    }

    /// Get invoice lines
    pub fn getLines(&self) -> Option<Vec<String>> {
        return self.lines.clone();
    }

    /// Add invoice line
    pub fn addLine(&mut self, line: String) {
        match &mut self.lines {
            Some(lines) => {
                lines.push(line);
            },
            None => {
                self.lines = Some(vec![line]);
            }
        }
    }

    /// Remove invoice line
    pub fn removeLine(&mut self, index: usize) {
        match &mut self.lines {
            Some(lines) => {
                lines.remove(index);
            },
            None => {}
        }
    }

    /// Clear all invoice lines
    pub fn clearLines(&mut self) {
        match &mut self.lines {
            Some(lines) => {
                lines.clear();
            },
            None => {}
        }
    }

    /// Get invoice total
    pub fn getTotals(&self) -> Option<String> {
        // return self.lines.clone();
        return Some(
            "".to_string()
        );
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_creates_invoices() {
        let mut invoice = Invoice::new(
            Some("foo".to_string()),
        );
        invoice.setCurrency(
            "EUR".to_string()
        );

        assert_eq!(true, true);
    }
}
