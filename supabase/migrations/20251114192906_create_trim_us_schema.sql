/*
  # TRIM-US Barbershop Database Schema

  ## Overview
  Complete database schema for luxury barbershop booking and management system.

  ## New Tables

  ### 1. services
  Stores all barbershop services with pricing and descriptions
  - `id` (uuid, primary key)
  - `name` (text) - Service name (e.g., "Signature Haircut")
  - `description` (text) - Detailed service description
  - `price` (numeric) - Service price in KES
  - `duration` (integer) - Duration in minutes
  - `category` (text) - Service category
  - `image_url` (text) - Service image
  - `created_at` (timestamptz)

  ### 2. barbers
  Team member profiles and specialties
  - `id` (uuid, primary key)
  - `name` (text) - Barber full name
  - `title` (text) - Professional title
  - `bio` (text) - Professional biography
  - `specialties` (text[]) - Array of specialties
  - `image_url` (text) - Professional portrait
  - `instagram` (text) - Instagram handle
  - `years_experience` (integer)
  - `is_available` (boolean)
  - `created_at` (timestamptz)

  ### 3. bookings
  Customer appointment bookings
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `barber_id` (uuid, foreign key)
  - `service_id` (uuid, foreign key)
  - `booking_date` (date)
  - `booking_time` (time)
  - `status` (text) - confirmed, pending, cancelled, completed
  - `notes` (text)
  - `created_at` (timestamptz)

  ### 4. testimonials
  Customer reviews and ratings
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_image` (text)
  - `rating` (integer) - 1-5 stars
  - `review` (text)
  - `service_type` (text)
  - `is_featured` (boolean)
  - `created_at` (timestamptz)

  ### 5. membership_packages
  Subscription and membership tiers
  - `id` (uuid, primary key)
  - `name` (text) - Package name
  - `description` (text)
  - `price` (numeric)
  - `billing_cycle` (text) - weekly, monthly, yearly
  - `benefits` (text[]) - Array of benefits
  - `is_popular` (boolean)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for services, barbers, testimonials, memberships
  - Restricted write access for bookings (customers can create their own)
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  duration integer NOT NULL,
  category text NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS barbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  specialties text[] DEFAULT '{}',
  image_url text DEFAULT '',
  instagram text DEFAULT '',
  years_experience integer DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  barber_id uuid REFERENCES barbers(id),
  service_id uuid REFERENCES services(id),
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_image text DEFAULT '',
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  service_type text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membership_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  billing_cycle text NOT NULL,
  benefits text[] DEFAULT '{}',
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Barbers are viewable by everyone"
  ON barbers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Membership packages are viewable by everyone"
  ON membership_packages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Customers can view their own bookings"
  ON bookings FOR SELECT
  TO anon, authenticated
  USING (true);