interface CondomData {
    id: number;
    category: string;
    brand: string;
    type: string;
    unit_of_measure_id: string | null;
    created_at: string | null;
    updated_at: string | null;
    number_of_condoms_per_unit: string | null;
}

interface StockRegistration {
    id: number;
    transaction_type: string;
    transaction_quantity: string;
    balance_on_hand: string;
    sending_organization_unit: string | null;
    receiving_organization_unit: string;
    transacted_by: string;
    transaction_date: string;
    condom_inventory_id: string;
    sending_organization_unit_level: string | null;
    receiving_organization_unit_level: string;
    created_at: string;
    updated_at: string;
    evidences: any[];
}

interface Distribution {
    id: number;
    transaction_type: string;
    transaction_quantity: string;
    balance_on_hand: string;
    sending_organization_unit: string;
    receiving_organization_unit: string[];
    transacted_by: string;
    transaction_date: string;
    condom_inventory_id: string;
    sending_organization_unit_level: string | null;
    receiving_organization_unit_level: string;
    created_at: string;
    updated_at: string;
    evidences: any[];
}

interface DataItem {
    id: number;
    condom_id: CondomData[];
    organization_unit_stocking: string;
    quantity_in_stock: string;
    batch_number: string;
    unit_of_measure_id: string | null;
    condom_unit_cost: string | null;
    created_by: string;
    date_of_creation: string;
    created_at: string;
    updated_at: string;
    stock_registrations: StockRegistration[];
    distributions: Distribution[];
}

 interface JmsPieChartProps {
    title: string;
    data: DataItem[];
}



export type{
    JmsPieChartProps,
    DataItem,
    Distribution,
    StockRegistration,
    CondomData
}
