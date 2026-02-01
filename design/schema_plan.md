# Schema Plan - PuzzleQuest

## Overview
This schema supports the "PuzzleQuest" game, tracking user progression through worlds and levels, and managing rewards.

## Tables

### 1. profiles (Public User Data)
Extends the default Supabase `auth.users` table.
- **id**: `uuid` (Primary Key, References `auth.users.id` ON DELETE CASCADE)
- **username**: `text` (Unique)
- **avatar_url**: `text` (Nullable)
- **total_stars**: `integer` (Default: 0)
- **current_world_id**: `uuid` (Nullable, References `worlds.id`)
- **created_at**: `timestamptz` (Default: `now()`)
- **updated_at**: `timestamptz` (Default: `now()`)

### 2. worlds (Game Chapters/Themes)
Represents the major areas or themes in the game (e.g., "Forest of Logic", "Math Mountains").
- **id**: `uuid` (Primary Key, Default: `gen_random_uuid()`)
- **name**: `text` (Not Null)
- **description**: `text` (Nullable)
- **slug**: `text` (Unique, for URLs/Assets)
- **order_index**: `integer` (Not Null, determines sequence)
- **image_url**: `text` (Nullable)
- **created_at**: `timestamptz` (Default: `now()`)

### 3. levels (Individual Puzzles)
Specific puzzle stages within a world.
- **id**: `uuid` (Primary Key, Default: `gen_random_uuid()`)
- **world_id**: `uuid` (Not Null, References `worlds.id` ON DELETE CASCADE)
- **title**: `text` (Not Null)
- **description**: `text` (Nullable)
- **type**: `text` (Enum/Check: 'matching', 'logic', 'pattern')
- **difficulty**: `integer` (1-5 scale)
- **order_index**: `integer` (Not Null, sequence within world)
- **puzzle_config**: `jsonb` (Stores the actual puzzle definition/answer key)
- **created_at**: `timestamptz` (Default: `now()`)

### 4. user_progress (Tracking)
Tracks which levels a user has completed and their performance.
- **id**: `uuid` (Primary Key, Default: `gen_random_uuid()`)
- **user_id**: `uuid` (Not Null, References `profiles.id` ON DELETE CASCADE)
- **level_id**: `uuid` (Not Null, References `levels.id` ON DELETE CASCADE)
- **status**: `text` (Check: 'locked', 'unlocked', 'completed', Default: 'locked')
- **stars_earned**: `integer` (0-3)
- **completed_at**: `timestamptz` (Nullable)
- **updated_at**: `timestamptz` (Default: `now()`)
- *Constraint*: Unique combination of `user_id` and `level_id`.

### 5. rewards (Unlockables)
Badges or items users can earn.
- **id**: `uuid` (Primary Key, Default: `gen_random_uuid()`)
- **name**: `text` (Not Null)
- **description**: `text`
- **icon_url**: `text`
- **unlock_condition_type**: `text` (e.g., 'level_complete', 'star_count')
- **unlock_condition_value**: `jsonb` (e.g., `{ "level_id": "..." }` or `{ "stars": 10 }`)
- **created_at**: `timestamptz` (Default: `now()`)

### 6. user_rewards
Mapping of rewards owned by a user.
- **id**: `uuid` (Primary Key, Default: `gen_random_uuid()`)
- **user_id**: `uuid` (Not Null, References `profiles.id` ON DELETE CASCADE)
- **reward_id**: `uuid` (Not Null, References `rewards.id` ON DELETE CASCADE)
- **earned_at**: `timestamptz` (Default: `now()`)

## Security Policies (RLS)
- **profiles**: Users can read all, update own.
- **worlds**: Public read-only.
- **levels**: Public read-only.
- **user_progress**: Users can read/insert/update own rows only.
- **rewards**: Public read-only.
- **user_rewards**: Users can read own rows.
