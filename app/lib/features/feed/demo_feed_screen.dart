import 'package:flutter/material.dart';
import '../../core/theme.dart';
import 'widgets/post_tile.dart';

class DemoFeedScreen extends StatelessWidget {
const DemoFeedScreen({super.key});

@override
Widget build(BuildContext context) {
return Scaffold(
backgroundColor: AppColors.bg,
appBar: AppBar(title: const Text('Feed')),
body: ListView(
padding: const EdgeInsets.all(AppSpacing.md),
children: [
PostTile(
avatarUrl: '',
displayName: 'Nico Robin',
handle: '@archaeogeek',
createdAt: DateTime.now().subtract(const Duration(minutes: 12)),
text:
'Just finished cataloging #OnePiece volume 25. The cover art slaps! Thanks @brickbox for the clean UI.',
mediaThumbUrl: 'https://picsum.photos/seed/brickbox/800/450',
likeCount: 128,
commentCount: 14,
likedByMe: false,
onTap: () {},
onMore: () {},
onLike: () {},
onComment: () {},
onShare: () {},
onTapHashtag: (tag) => debugPrint('tap hashtag: $tag'),
onTapMention: (h) => debugPrint('tap mention: @$h'),
),
],
),
);
}
}
