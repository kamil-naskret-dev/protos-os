create type transaction_type as enum ('income', 'expense');

create table finance_categories (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  name       text not null,
  type       transaction_type not null,
  color      text not null default '#6366f1',
  icon       text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table finance_transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  category_id uuid references finance_categories on delete set null,
  amount      numeric(12, 2) not null check (amount > 0),
  type        transaction_type not null,
  description text not null,
  date        date not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index finance_categories_user_id_idx on finance_categories (user_id);
create index finance_transactions_user_id_date_idx on finance_transactions (user_id, date desc);
create index finance_transactions_user_id_category_idx on finance_transactions (user_id, category_id);

create trigger finance_categories_updated_at
  before update on finance_categories
  for each row execute function update_updated_at();

create trigger finance_transactions_updated_at
  before update on finance_transactions
  for each row execute function update_updated_at();
