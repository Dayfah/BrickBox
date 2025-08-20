import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../core/theme.dart';
import 'widgets/post_composer.dart';

class DemoComposerScreen extends StatelessWidget {
const DemoComposerScreen({super.key});

@override
Widget build(BuildContext context) {
final picker = ImagePicker();

Future<File?> pick() async {
final source = await showModalBottomSheet<ImageSource>(
context: context,
backgroundColor: AppColors.card,
shape: const RoundedRectangleBorder(
borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadius.lg)),
),
builder: (_) => SafeArea(
child: Wrap(
children: [
ListTile(
leading: const Icon(Icons.photo_library, color: AppColors.onPrimary),
title: const Text('Photo Library'),
onTap: () => Navigator.pop(_, ImageSource.gallery),
),
ListTile(
leading: const Icon(Icons.photo_camera, color: AppColors.onPrimary),
title: const Text('Camera'),
onTap: () => Navigator.pop(_, ImageSource.camera),
),
const SizedBox(height: AppSpacing.sm),
],
),
),
);
if (source == null) return null;
final x = await picker.pickImage(source: source, imageQuality: 90);
return x == null ? null : File(x.path);
}

Future<void> submit(String text, File? media) async {
debugPrint('POST: "$text" media: ${media?.path}');
ScaffoldMessenger.of(context).showSnackBar(
const SnackBar(content: Text('Posted!')),
);
}

return Scaffold(
appBar: AppBar(title: const Text('Compose')),
backgroundColor: AppColors.bg,
body: Padding(
padding: const EdgeInsets.all(AppSpacing.md),
child: Column(
children: [
PostComposer(
avatarUrl: '',
onPickMedia: pick,
onSubmit: submit,
),
const SizedBox(height: AppSpacing.lg),
const Text(
"Tip: Use #hashtags and @mentions. 280-char limit.",
style: TextStyle(color: AppColors.textSecondary),
),
],
),
),
);
}
}
