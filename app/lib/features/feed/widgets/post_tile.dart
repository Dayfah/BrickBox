import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import '../../../core/theme.dart';

class PostTile extends StatelessWidget {
final String avatarUrl;
final String displayName;
final String handle;
final DateTime createdAt;
final String text;
final String? mediaThumbUrl;
final int likeCount;
final int commentCount;
final bool likedByMe;

final VoidCallback onTap;
final VoidCallback onMore;
final VoidCallback onLike;
final VoidCallback onComment;
final VoidCallback onShare;
final void Function(String hashtag)? onTapHashtag;
final void Function(String handle)? onTapMention;

const PostTile({
super.key,
required this.avatarUrl,
required this.displayName,
required this.handle,
required this.createdAt,
required this.text,
this.mediaThumbUrl,
this.likeCount = 0,
this.commentCount = 0,
this.likedByMe = false,
required this.onTap,
required this.onMore,
required this.onLike,
required this.onComment,
required this.onShare,
this.onTapHashtag,
this.onTapMention,
});

@override
Widget build(BuildContext context) {
final timeLabel = _timeAgo(createdAt);
return InkWell(
onTap: onTap,
borderRadius: BorderRadius.circular(AppRadius.lg),
child: Container(
padding: const EdgeInsets.all(AppSpacing.md),
margin: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
decoration: BoxDecoration(
color: AppColors.card,
borderRadius: BorderRadius.circular(AppRadius.lg),
border: Border.all(color: AppColors.outline, width: 0.5),
boxShadow: AppShadows.soft,
),
child: Row(
crossAxisAlignment: CrossAxisAlignment.start,
children: [
_Avatar(url: avatarUrl),
const SizedBox(width: AppSpacing.md),
Expanded(
child: Column(
crossAxisAlignment: CrossAxisAlignment.start,
children: [
_Header(
displayName: displayName,
handle: handle,
timeLabel: timeLabel,
onMore: onMore,
),
const SizedBox(height: AppSpacing.xs),
_RichTextBody(
text: text,
onTapHashtag: onTapHashtag,
onTapMention: onTapMention,
),
if (mediaThumbUrl != null) ...[
const SizedBox(height: AppSpacing.sm),
_MediaThumb(url: mediaThumbUrl!),
],
const SizedBox(height: AppSpacing.sm),
_Actions(
likedByMe: likedByMe,
likeCount: likeCount,
commentCount: commentCount,
onLike: onLike,
onComment: onComment,
onShare: onShare,
),
],
),
),
],
),
),
);
}

String _timeAgo(DateTime dt) {
final now = DateTime.now();
final diff = now.difference(dt);
if (diff.inSeconds < 60) return '${diff.inSeconds}s';
if (diff.inMinutes < 60) return '${diff.inMinutes}m';
if (diff.inHours < 24) return '${diff.inHours}h';
if (diff.inDays < 7) return '${diff.inDays}d';
return '${dt.month}/${dt.day}/${dt.year % 100}';
}
}

class _Avatar extends StatelessWidget {
final String url;
const _Avatar({required this.url});

@override
Widget build(BuildContext context) {
return CircleAvatar(
radius: 22,
backgroundColor: AppColors.outline.withOpacity(0.3),
backgroundImage: url.isEmpty ? null : NetworkImage(url),
child: url.isEmpty
? Icon(Icons.person, color: AppColors.textSecondary)
: null,
);
}
}

class _Header extends StatelessWidget {
final String displayName;
final String handle;
final String timeLabel;
final VoidCallback onMore;

const _Header({
required this.displayName,
required this.handle,
required this.timeLabel,
required this.onMore,
});

@override
Widget build(BuildContext context) {
final textTheme = Theme.of(context).textTheme;
return Row(
crossAxisAlignment: CrossAxisAlignment.center,
children: [
Flexible(
child: RichText(
text: TextSpan(
children: [
TextSpan(
text: displayName,
style: textTheme.titleSmall?.copyWith(
color: AppColors.onPrimary,
fontWeight: FontWeight.w700,
),
),
TextSpan(
text: ' $handle · $timeLabel',
style: textTheme.bodySmall?.copyWith(
color: AppColors.textSecondary,
),
),
],
),
overflow: TextOverflow.ellipsis,
),
),
const SizedBox(width: AppSpacing.sm),
InkWell(
borderRadius: BorderRadius.circular(20),
onTap: onMore,
child: const Padding(
padding: EdgeInsets.all(4.0),
child: Icon(Icons.more_horiz, size: 18, color: AppColors.textSecondary),
),
),
],
);
}
}

class _RichTextBody extends StatelessWidget {
final String text;
final void Function(String hashtag)? onTapHashtag;
final void Function(String handle)? onTapMention;

const _RichTextBody({
required this.text,
this.onTapHashtag,
this.onTapMention,
});

@override
Widget build(BuildContext context) {
final spans = <InlineSpan>[];
final reg = RegExp(r'(#\w+|@\w+)', multiLine: true);
int last = 0;

for (final match in reg.allMatches(text)) {
if (match.start > last) {
spans.add(TextSpan(text: text.substring(last, match.start)));
}
final token = match.group(0)!;
final isTag = token.startsWith('#');

spans.add(
TextSpan(
text: token,
style: TextStyle(
color: AppColors.onPrimary,
fontWeight: FontWeight.w600,
),
recognizer: (TapGestureRecognizer()
..onTap = () {
if (isTag) {
onTapHashtag?.call(token.substring(1));
} else {
onTapMention?.call(token.substring(1));
}
}),
),
);
last = match.end;
}
if (last < text.length) {
spans.add(TextSpan(text: text.substring(last)));
}

return RichText(
text: TextSpan(
style: Theme.of(context).textTheme.bodyMedium?.copyWith(
color: AppColors.textPrimary,
height: 1.25,
),
children: spans,
),
);
}
}

class _MediaThumb extends StatelessWidget {
final String url;
const _MediaThumb({required this.url});

@override
Widget build(BuildContext context) {
return ClipRRect(
borderRadius: BorderRadius.circular(AppRadius.lg),
child: AspectRatio(
aspectRatio: 16 / 9,
child: Stack(
fit: StackFit.expand,
children: [
Container(color: AppColors.primaryDark.withOpacity(0.4)),
Image.network(url, fit: BoxFit.cover, errorBuilder: (_, __, ___) {
return Center(
child: Icon(Icons.image, color: AppColors.textSecondary),
);
}),
],
),
),
);
}
}

class _Actions extends StatelessWidget {
final bool likedByMe;
final int likeCount;
final int commentCount;
final VoidCallback onLike;
final VoidCallback onComment;
final VoidCallback onShare;

const _Actions({
required this.likedByMe,
required this.likeCount,
required this.commentCount,
required this.onLike,
required this.onComment,
required this.onShare,
});

@override
Widget build(BuildContext context) {
final muted = AppColors.textSecondary;
return Row(
children: [
_ActionIcon(
icon: likedByMe ? Icons.favorite : Icons.favorite_border,
color: likedByMe ? AppColors.primary : muted,
label: likeCount.toString(),
onTap: onLike,
),
const SizedBox(width: AppSpacing.lg),
_ActionIcon(
icon: Icons.mode_comment_outlined,
color: muted,
label: commentCount.toString(),
onTap: onComment,
),
const SizedBox(width: AppSpacing.lg),
_ActionIcon(
icon: Icons.ios_share,
color: muted,
label: 'Share',
onTap: onShare,
),
],
);
}
}

class _ActionIcon extends StatelessWidget {
final IconData icon;
final String label;
final Color color;
final VoidCallback onTap;

const _ActionIcon({
required this.icon,
required this.label,
required this.color,
required this.onTap,
});

@override
Widget build(BuildContext context) {
return InkWell(
borderRadius: BorderRadius.circular(20),
onTap: onTap,
child: Padding(
padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
child: Row(
children: [
Icon(icon, size: 18, color: color),
const SizedBox(width: 6),
Text(
label,
style: Theme.of(context).textTheme.bodySmall?.copyWith(color: color),
),
],
),
),
);
}
}
