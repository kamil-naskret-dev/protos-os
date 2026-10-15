-- ─── Enable RLS on all user tables ───────────────────────────────────────────

alter table profiles            enable row level security;
alter table areas               enable row level security;
alter table activities          enable row level security;
alter table plans               enable row level security;
alter table habits               enable row level security;
alter table habit_completions   enable row level security;
alter table goals               enable row level security;
alter table finance_categories  enable row level security;
alter table finance_transactions enable row level security;
alter table notes               enable row level security;

-- ─── profiles ─────────────────────────────────────────────────────────────────

create policy "profiles: users manage own profile"
  on profiles for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- ─── areas ────────────────────────────────────────────────────────────────────

create policy "areas: users manage own areas"
  on areas for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── activities ───────────────────────────────────────────────────────────────

create policy "activities: users manage own activities"
  on activities for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── plans ────────────────────────────────────────────────────────────────────

create policy "plans: users manage own plans"
  on plans for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── habits ───────────────────────────────────────────────────────────────────

create policy "habits: users manage own habits"
  on habits for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── habit_completions ────────────────────────────────────────────────────────

create policy "habit_completions: users manage own completions"
  on habit_completions for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── goals ────────────────────────────────────────────────────────────────────

create policy "goals: users manage own goals"
  on goals for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── finance_categories ───────────────────────────────────────────────────────

create policy "finance_categories: users manage own categories"
  on finance_categories for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── finance_transactions ─────────────────────────────────────────────────────

create policy "finance_transactions: users manage own transactions"
  on finance_transactions for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── notes ────────────────────────────────────────────────────────────────────

create policy "notes: users manage own notes"
  on notes for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
