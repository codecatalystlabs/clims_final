interface Evidence {
    id: number;
    transaction_id: string;
    name_of_evidence: string | null;
    evidence_location: string;
    created_at: string;
    updated_at: string;
}

interface Distribution {
    id: number;
    transaction_type: string;
    transaction_quantity: string;
    balance_on_hand: string;
    sending_organization_unit: string;
    receiving_organization_unit: string;
    transacted_by: string;
    transaction_date: string;
    condom_inventory_id: string;
    sending_organization_unit_level: string | null;
    receiving_organization_unit_level: string | null;
    created_at: string;
    updated_at: string;
    evidences: Evidence[];
}

interface Condom {
    id: number;
    category: string;
    brand: string;
    type: string;
    unit_of_measure_id: string;
    created_at: string;
    updated_at: string;
    number_of_condoms_per_unit: string | null;
}

interface InventoryItem {
    id: number;
    condom_id: Condom[];
    organization_unit_stocking: string;
    quantity_in_stock: string;
    batch_number: string | null;
    unit_of_measure_id: string | null;
    condom_unit_cost: string | null;
    created_by: string;
    date_of_creation: string;
    created_at: string;
    updated_at: string;
    additions: any[]; 
    distributions: Distribution[];
}

export const sumTransactionQuantities = (data: InventoryItem[]): number => {
    let totalQuantity = 0;

    data.forEach(item => {
        item?.distributions?.forEach(distribution => {
            totalQuantity += parseInt(distribution.transaction_quantity, 10);
        });
    });

    return totalQuantity;
};


