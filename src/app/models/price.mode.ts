import { Instrument } from "./instrument.model";

export interface Price{
    askPrice: number,
	bidPrice: number,
	priceTimestamp: string,
	instrument: Instrument    
    
}
