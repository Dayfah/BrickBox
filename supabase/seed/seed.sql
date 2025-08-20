-- Demo users need to be created via auth; here we seed catalog + sample posts
insert into public.series (title, publisher, universe, start_year)
values
  ('The Amazing Spider-Man', 'Marvel', 'Earth-616', 1963),
  ('Detective Comics', 'DC', 'Prime Earth', 1937),
  ('One Piece', 'Shueisha', 'Main', 1997);

insert into public.issues (series_id, issue_number, title, release_date, story_arc)
values
  (1, '1', 'Spider-Man!', '1963-03-01', 'Origin'),
  (1, '300', 'Venom', '1988-05-01', 'Milestone'),
  (2, '27', 'The Case of the Chemical Syndicate', '1939-05-01', 'Debut'),
  (3, '1', 'Romance Dawn', '1997-07-22', 'East Blue');

-- Optional sample notification kinds for UI tests
insert into public.notifications (user_id, kind, payload)
values
  ('00000000-0000-0000-0000-000000000000', 'foc', '{"message":"FOC in 48h for ASM #300 facsimile"}');
