import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
static const Color bg = Color(0xFF121319);
static const Color surface = Color(0xFF121319);
static const Color card = Color(0xFF27333A);
static const Color outline = Color(0xFF646D71);

static const Color primary = Color(0xFF8D302E);
static const Color primaryDark = Color(0xFF451D1E);
static const Color onPrimary = Color(0xFFD8D2C3);

static const Color textPrimary = Color(0xFFD8D2C3);
static const Color textSecondary = Color(0xFF646D71);

static const Color danger = Color(0xFFB3261E);
static const Color success = Color(0xFF5DAA7C);
}

class AppSpacing {
static const double xs = 4;
static const double sm = 8;
static const double md = 16;
static const double lg = 24;
static const double xl = 32;
}

class AppRadius {
static const double sm = 4;
static const double md = 8;
static const double lg = 12;
}

class AppShadows {
static final soft = [
BoxShadow(
color: Colors.black.withOpacity(0.6),
blurRadius: 8,
offset: const Offset(0, 4),
)
];
}

class BrickBoxTheme {
  static ThemeData get dark {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: AppColors.bg,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        onPrimary: AppColors.onPrimary,
        secondary: AppColors.card,
        onSecondary: AppColors.onPrimary,
        surface: AppColors.surface,
        onSurface: AppColors.textPrimary,
        error: AppColors.danger,
        onError: AppColors.onPrimary,
        background: AppColors.bg,
        onBackground: AppColors.textPrimary,
      ),
      textTheme: GoogleFonts.interTextTheme(base.textTheme).apply(
        bodyColor: AppColors.textPrimary,
        displayColor: AppColors.textPrimary,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.card,
        foregroundColor: AppColors.onPrimary,
        elevation: 0,
      ),
      cardColor: AppColors.card,
    );
  }
}

