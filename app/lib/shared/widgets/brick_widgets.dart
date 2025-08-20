import 'package:flutter/material.dart';
import '../../core/theme.dart';

class AppCard extends StatelessWidget {
final Widget child;
final EdgeInsetsGeometry padding;
final EdgeInsetsGeometry margin;

const AppCard({
super.key,
required this.child,
this.padding = const EdgeInsets.all(AppSpacing.md),
this.margin = const EdgeInsets.all(AppSpacing.sm),
});

@override
Widget build(BuildContext context) {
return Card(
margin: margin,
child: Padding(
padding: padding,
child: child,
),
);
}
}
