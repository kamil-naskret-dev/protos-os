create table notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  title      text,
  content    text not null default '',
  date       date not null default current_date,
  tags       text[] not null default '{}',
  is_pinned  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index notes_user_id_date_idx on notes (user_id, date desc);
create index notes_user_id_pinned_idx on notes (user_id, is_pinned) where is_pinned = true;

create trigger notes_updated_at
  before update on notes
  for each row execute function update_updated_at();
