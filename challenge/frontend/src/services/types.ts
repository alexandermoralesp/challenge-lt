interface BookingBase {
  id: number;
  buyer: string;
  provider: string;
  details: string;
  duration: number;
}

export interface BookingResponse extends BookingBase {
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Booking extends BookingBase {
  date: Date;
  created_at: Date;
  updated_at: Date;
}
