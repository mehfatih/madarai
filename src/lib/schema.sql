-- MADAR AI — Supabase Schema
-- Run this in Supabase SQL Editor

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company TEXT,
  plan_tier TEXT DEFAULT 'free' CHECK (plan_tier IN ('free','starter','growth','scale')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- Waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company_size TEXT,
  monthly_spend TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','unsubscribed')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  type TEXT DEFAULT 'general'CHECK (type IN ('general','demo','support','partner')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  cover_note TEXT,
  status TEXT DEFAULT 'received' CHECK (status IN ('received','reviewing','interview','offer','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);
