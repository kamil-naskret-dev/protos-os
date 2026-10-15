create type habit_frequency as enum ('daily', 'weekly');

create table habits (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  area_id       uuid references areas on delete set null,
  title         text not null,
  description   text,
  frequency     habit_frequency not null default 'daily',
  target_days   smallint[] not null default '{1,2,3,4,5,6,7}', -- 1=Mon..7=Sun (ISO)
  color         text not null default '#6366f1',
  icon          text,
  sort_order    int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table habit_completions (
  id           uuid primary key default gen_random_uuid(),
  habit_id     uuid not null references habits on delete cascade,
  user_id      uuid not null references auth.users on delete cascade,
  date         date not null,
  completed_at timestamptz not null default now(),
  unique (habit_id, date)
);

create index habits_user_id_idx on habits (user_id);
create index habit_completions_user_id_date_idx on habit_completions (user_id, date desc);
create index habit_completions_habit_id_date_idx on habit_completions (habit_id, date desc);

create trigger habits_updated_at
  before update on habits
  for each row execute function update_updated_at();
