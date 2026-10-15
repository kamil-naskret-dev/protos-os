create type plan_status as enum ('planned', 'done', 'skipped');

create table plans (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  area_id          uuid references areas on delete set null,
  title            text not null,
  date             date not null,
  start_time       time not null,
  end_time         time not null,
  notes            text,
  status           plan_status not null default 'planned',
  is_recurring     boolean not null default false,
  recurrence_rule  text, -- iCal RRULE format
  parent_plan_id   uuid references plans on delete cascade, -- for recurring instances
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint plans_time_check check (end_time > start_time)
);

create index plans_user_id_date_idx on plans (user_id, date);
create index plans_user_id_area_id_idx on plans (user_id, area_id);

create trigger plans_updated_at
  before update on plans
  for each row execute function update_updated_at();
