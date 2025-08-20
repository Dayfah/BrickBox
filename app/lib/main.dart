import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'features/feed/demo_feed_screen.dart';
import 'features/feed/demo_composer_screen.dart';

void main() {
  runApp(const BrickBoxApp());
}

class BrickBoxApp extends StatelessWidget {
  const BrickBoxApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BrickBox',
      theme: BrickBoxTheme.dark,
      home: const HomeSwitcher(),
    );
  }
}

class HomeSwitcher extends StatefulWidget {
  const HomeSwitcher({super.key});
  @override
  State<HomeSwitcher> createState() => _HomeSwitcherState();
}

class _HomeSwitcherState extends State<HomeSwitcher> {
  int _idx = 0;
  @override
  Widget build(BuildContext context) {
    final pages = const [DemoFeedScreen(), DemoComposerScreen()];
    return Scaffold(
      body: pages[_idx],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _idx,
        onDestinationSelected: (i) => setState(() => _idx = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dynamic_feed), label: 'Feed'),
          NavigationDestination(icon: Icon(Icons.edit), label: 'Compose'),
        ],
      ),
    );
  }
}
