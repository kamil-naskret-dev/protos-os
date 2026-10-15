create table areas (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  name        text not null,
  color       text not null default '#6366f1',
  icon        text,
  description text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index areas_user_id_idx on areas (user_id);

create trigger areas_updated_at
  before update on areas
  for each row execute function update_updated_at();