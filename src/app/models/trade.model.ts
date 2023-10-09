export interface Trade{
    tradeId: string,
    quantity: number,
    executionPrice: number,
    direction: string,
    order?: Order
    cashValue: number,
    clientId: number,
    instrumentId: string
}
export interface Order{
    orderId: string,
    quantity: number,
    targetPrice: number,
    direction: string,
    clientId: string,
    instrumentId: string,
}
