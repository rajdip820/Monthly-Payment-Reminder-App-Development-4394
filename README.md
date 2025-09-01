# Monthly Payment Reminder App

A comprehensive web application for managing monthly payment reminders with Supabase backend integration.

## Features

### 🔐 User Authentication
- Email/password authentication
- Google OAuth integration
- Secure user sessions with Supabase Auth

### 📊 Payment Dashboard
- View all payment reminders
- Filter by status (Pending, Paid, Overdue, Due Soon)
- Search functionality
- Real-time statistics and insights

### ➕ Payment Management
- Add new payment reminders
- Edit existing payments
- Delete payments
- Mark payments as paid
- Rich form validation

### ⏰ Smart Reminders
- Automatic detection of overdue payments
- Upcoming payments (due within 7 days)
- Visual indicators for payment status
- Categorized reminder views

### 📁 Payment History
- Complete history of paid payments
- Monthly filtering
- Export to CSV and PDF
- Generate individual receipts

### 🔒 Security & Privacy
- Row Level Security (RLS) with Supabase
- Users can only access their own data
- Secure authentication flows
- Protected routes

## Tech Stack

- **Frontend**: React 18, TailwindCSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Routing**: React Router DOM v7
- **Icons**: React Icons
- **PDF Generation**: jsPDF
- **Date Handling**: date-fns

## Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run this SQL in your Supabase SQL editor:

```sql
-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Users can only see their own payments" ON payments
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE
  ON payments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

### 4. Optional: Enable Google OAuth
1. Go to Supabase Dashboard > Authentication > Settings
2. Add Google as an OAuth provider
3. Configure your Google OAuth credentials

### 5. Run the Application
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── AuthForm.jsx          # Login/signup form
│   ├── Payments/
│   │   ├── PaymentCard.jsx       # Individual payment card
│   │   ├── PaymentForm.jsx       # Add/edit payment modal
│   │   └── PaymentFilters.jsx    # Search and filter controls
│   ├── Layout.jsx                # Main layout wrapper
│   └── Navbar.jsx                # Navigation component
├── contexts/
│   └── AuthContext.jsx           # Authentication context
├── hooks/
│   └── usePayments.js            # Payment data management
├── lib/
│   └── supabase.js               # Supabase client configuration
├── pages/
│   ├── Dashboard.jsx             # Main dashboard page
│   ├── Reminders.jsx             # Reminders page
│   └── History.jsx               # Payment history page
├── utils/
│   └── pdfGenerator.js           # PDF/CSV export utilities
├── common/
│   └── SafeIcon.jsx              # Safe icon component
├── App.jsx                       # Main app component
└── main.jsx                      # App entry point
```

## Key Features Explained

### Row Level Security (RLS)
The app implements Supabase RLS to ensure users can only access their own payment data. Each payment is linked to a user ID, and the database policy automatically filters results.

### Smart Status Detection
- **Overdue**: Due date is in the past and status is "Pending"
- **Due Soon**: Due within the next 7 days and status is "Pending"
- **Paid**: Status is "Paid"

### Export Functionality
- **CSV Export**: All payment data in spreadsheet format
- **PDF Receipts**: Individual payment receipts
- **Monthly Reports**: Comprehensive PDF reports by month

### Responsive Design
The app is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.