# BrickBox

BrickBox — The Modern Vault for Comic Collectors. This repository contains a Flutter + Supabase application along with SQL migrations, edge functions, and seed data.

## Getting Started

### Supabase
1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli).
2. Copy `supabase/.env.example` to `supabase/.env` and fill in values.
3. Start local services:
   ```bash
   supabase start
   supabase db reset --seed
   ```

### Flutter App
1. Ensure [Flutter](https://flutter.dev) 3.22+ with Dart 3 is installed.
2. From `app/` run:
  ```bash
  flutter pub get
  flutter run --dart-define=SUPABASE_URL=your_url --dart-define=SUPABASE_ANON_KEY=your_key
  ```

## Tests
- `flutter analyze`
- `flutter test`
- `deno test -A supabase/functions/**/`
- `sqlfluff lint supabase/migrations/*.sql`

## Assets
The app icon is stored as base64 text at `assets/brickbox-icon.b64`. Decode it to a PNG with:

```bash
python scripts/decode_icon.py
```

## Project Structure
```
app/        # Flutter application
supabase/   # SQL migrations, policies, edge functions, seed data
```
