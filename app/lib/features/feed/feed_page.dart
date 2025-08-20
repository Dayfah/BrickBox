import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class FeedPage extends StatefulWidget {
  const FeedPage({super.key});

  @override
  State<FeedPage> createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  final _client = Supabase.instance.client;
  List<Map<String, dynamic>> posts = [];
  RealtimeChannel? _channel;

  @override
  void initState() {
    super.initState();
    _load();
    _subscribe();
  }

  Future<void> _load() async {
    final res = await _client
        .from('posts')
        .select('id, body, created_at, author')
        .order('created_at', ascending: false)
        .limit(50);
    setState(() => posts = (res as List).cast<Map<String, dynamic>>());
  }

  void _subscribe() {
    _channel = _client.channel('public:posts')
      ..on(
        RealtimeListenTypes.postgresChanges,
        ChannelFilter(event: 'INSERT', schema: 'public', table: 'posts'),
        (payload, [ref]) {
          setState(() {
            posts = [payload.newRecord as Map<String, dynamic>, ...posts];
          });
        },
      )
      ..subscribe();
  }

  Future<void> _createPost() async {
    final text = await showDialog<String>(
      context: context,
      builder: (_) => const _ComposerDialog(),
    );
    if (text == null || text.trim().isEmpty) return;
    await _client.from('posts').insert({
      'author': _client.auth.currentUser!.id,
      'body': text.trim(),
    });
  }

  @override
  void dispose() {
    _channel?.unsubscribe();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('BrickBox')),
      floatingActionButton:
          FloatingActionButton(onPressed: _createPost, child: const Icon(Icons.add)),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView.builder(
          itemCount: posts.length,
          itemBuilder: (_, i) {
            final p = posts[i];
            return ListTile(
              title: Text(p['body'] ?? ''),
              subtitle: Text(p['created_at'] ?? ''),
            );
          },
        ),
      ),
    );
  }
}

class _ComposerDialog extends StatefulWidget {
  const _ComposerDialog();

  @override
  State<_ComposerDialog> createState() => _ComposerDialogState();
}

class _ComposerDialogState extends State<_ComposerDialog> {
  final ctrl = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('New Post'),
      content: TextField(controller: ctrl, maxLines: 5),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        FilledButton(onPressed: () => Navigator.pop(context, ctrl.text), child: const Text('Post')),
      ],
    );
  }
}
