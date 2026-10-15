create table activities (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  area_id          uuid references areas on delete set null,
  title            text not null,
  date             date not null,
  duration_minutes int not null check (duration_minutes > 0),
  notes            text,
  tags             text[] not null default '{}',
  mood             smallint check (mood between 1 and 5),
  energy           smallint check (energy between 1 and 5),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index activities_user_id_date_idx on activities (user_id, date desc);
create index activities_user_id_area_id_idx on activities (user_id, area_id);

create trigger activities_updated_at
  before update on activities
  for each row execute function update_updated_at();
