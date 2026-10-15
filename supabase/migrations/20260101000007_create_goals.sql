create type goal_status as enum ('active', 'completed', 'archived');

create table goals (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  area_id     uuid references areas on delete set null,
  title       text not null,
  description text,
  target_date date,
  status      goal_status not null default 'active',
  progress    smallint not null default 0 check (progress between 0 and 100),
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index goals_user_id_idx on goals (user_id);
create index goals_user_id_status_idx on goals (user_id, status);

create trigger goals_updated_at
  before update on goals
  for each row execute function update_updated_at();
