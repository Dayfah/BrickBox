import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../features/auth/sign_in_page.dart';
import '../features/feed/feed_page.dart';

final router = GoRouter(
  initialLocation: '/',
  redirect: (context, state) {
    final session = Supabase.instance.client.auth.currentSession;
    final loggedIn = session != null;
    final loggingIn = state.matchedLocation == '/signin';
    if (!loggedIn && !loggingIn) return '/signin';
    if (loggedIn && loggingIn) return '/';
    return null;
  },
  routes: [
    GoRoute(path: '/signin', builder: (_, __) => const SignInPage()),
    GoRoute(path: '/', builder: (_, __) => const FeedPage()),
  ],
);
