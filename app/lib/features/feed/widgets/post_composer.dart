import 'dart:io';
import 'package:flutter/material.dart';
import '../../../core/theme.dart';

class PostComposer extends StatefulWidget {
final String avatarUrl;
final int maxLength;
final Future<File?> Function()? onPickMedia;
final Future<void> Function(String text, File? media) onSubmit;

const PostComposer({
super.key,
required this.avatarUrl,
required this.onSubmit,
this.onPickMedia,
this.maxLength = 280,
});

@override
State<PostComposer> createState() => _PostComposerState();
}

class _PostComposerState extends State<PostComposer> {
final _controller = TextEditingController();
File? _attached;
bool _submitting = false;

@override
void dispose() {
_controller.dispose();
super.dispose();
}

int get _remaining => widget.maxLength - _controller.text.characters.length;
bool get _tooLong => _remaining < 0;
bool get _canPost => !_submitting && _controller.text.trim().isNotEmpty && !_tooLong;

Future<void> _handlePick() async {
if (widget.onPickMedia == null) return;
final f = await widget.onPickMedia!.call();
if (!mounted) return;
setState(() => _attached = f);
}

Future<void> _handleSubmit() async {
if (!_canPost) return;
setState(() => _submitting = true);
try {
await widget.onSubmit(_controller.text.trim(), _attached);
if (!mounted) return;
_controller.clear();
setState(() => _attached = null);
} finally {
if (mounted) setState(() => _submitting = false);
}
}

@override
Widget build(BuildContext context) {
final textTheme = Theme.of(context).textTheme;

return Container(
padding: const EdgeInsets.all(AppSpacing.md),
decoration: BoxDecoration(
color: AppColors.card,
borderRadius: BorderRadius.circular(AppRadius.lg),
border: Border.all(color: AppColors.outline, width: 0.5),
boxShadow: AppShadows.soft,
),
child: Row(
crossAxisAlignment: CrossAxisAlignment.start,
children: [
CircleAvatar(
radius: 20,
backgroundColor: AppColors.outline.withOpacity(0.3),
backgroundImage:
widget.avatarUrl.isEmpty ? null : NetworkImage(widget.avatarUrl),
child: widget.avatarUrl.isEmpty
? Icon(Icons.person, color: AppColors.textSecondary)
: null,
),
const SizedBox(width: AppSpacing.md),
Expanded(
child: Column(
crossAxisAlignment: CrossAxisAlignment.start,
children: [
TextField(
controller: _controller,
maxLines: null,
minLines: 2,
onChanged: (_) => setState(() {}),
style: textTheme.bodyMedium?.copyWith(color: AppColors.textPrimary),
decoration: const InputDecoration(
hintText: "Share your thoughts… #hashtag @mention",
hintStyle: TextStyle(color: AppColors.textSecondary),
contentPadding: EdgeInsets.all(AppSpacing.sm),
enabledBorder: OutlineInputBorder(
borderSide: BorderSide(color: AppColors.outline),
borderRadius: BorderRadius.all(Radius.circular(AppRadius.md)),
),
focusedBorder: OutlineInputBorder(
borderSide: BorderSide(color: AppColors.primary, width: 1.5),
borderRadius: BorderRadius.all(Radius.circular(AppRadius.md)),
),
filled: true,
fillColor: AppColors.card,
),
),
if (_attached != null) ...[
const SizedBox(height: AppSpacing.sm),
_AttachmentPreview(
file: _attached!,
onRemove: () => setState(() => _attached = null),
),
],
const SizedBox(height: AppSpacing.sm),
Row(
children: [
IconButton(
tooltip: 'Attach media',
onPressed: widget.onPickMedia == null ? null : _handlePick,
icon: const Icon(Icons.attach_file, color: AppColors.onPrimary),
),
const SizedBox(width: AppSpacing.sm),
IconButton(
tooltip: 'Add hashtag',
onPressed: () {
final text = _controller.text;
_controller.text = '${text.isEmpty ? '' : '$text '}#';
_controller.selection = TextSelection.fromPosition(
TextPosition(offset: _controller.text.length),
);
setState(() {});
},
icon: const Icon(Icons.tag, color: AppColors.onPrimary),
),
const Spacer(),
Text(
_remaining.toString(),
style: textTheme.bodySmall?.copyWith(
color: _tooLong ? AppColors.danger : AppColors.textSecondary,
fontWeight: _tooLong ? FontWeight.w700 : FontWeight.w500,
),
),
const SizedBox(width: AppSpacing.md),
ElevatedButton(
onPressed: _canPost ? _handleSubmit : null,
child: _submitting
? const SizedBox(
width: 16,
height: 16,
child: CircularProgressIndicator(strokeWidth: 2),
)
: const Text('Post'),
),
],
),
],
),
),
],
),
);
}
}

class _AttachmentPreview extends StatelessWidget {
final File file;
final VoidCallback onRemove;

const _AttachmentPreview({required this.file, required this.onRemove});

bool get _isImage {
final p = file.path.toLowerCase();
return p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg') || p.endsWith('.webp');
}

@override
Widget build(BuildContext context) {
return Stack(
children: [
ClipRRect(
borderRadius: BorderRadius.circular(AppRadius.lg),
child: AspectRatio(
aspectRatio: 16 / 9,
child: _isImage
? Image.file(file, fit: BoxFit.cover)
: Container(
color: AppColors.primaryDark.withOpacity(0.4),
child: const Center(
child: Icon(Icons.videocam, size: 40, color: AppColors.onPrimary),
),
),
),
),
Positioned(
top: 8,
right: 8,
child: InkWell(
onTap: onRemove,
borderRadius: BorderRadius.circular(16),
child: Container(
decoration: const BoxDecoration(
color: Colors.black54,
shape: BoxShape.circle,
),
padding: const EdgeInsets.all(6),
child: const Icon(Icons.close, size: 16, color: AppColors.onPrimary),
),
),
),
],
);
}
}
