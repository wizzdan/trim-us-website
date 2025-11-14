export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image_url: string;
  created_at: string;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image_url: string;
  instagram: string;
  years_experience: number;
  is_available: boolean;
  created_at: string;
}

export interface Booking {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  barber_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_image: string;
  rating: number;
  review: string;
  service_type: string;
  is_featured: boolean;
  created_at: string;
}

export interface MembershipPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  benefits: string[];
  is_popular: boolean;
  created_at: string;
}
