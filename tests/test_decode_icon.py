from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import scripts.decode_icon as decode_icon  # noqa: E402


def test_decode_icon_writes_png(tmp_path, monkeypatch):
    """Decode the base64 icon and ensure PNG is produced in tmp directory."""
    src_b64 = (
        Path(__file__).resolve().parents[1] / "assets" / "brickbox-icon.b64"
    )
    tmp_b64 = tmp_path / "icon.b64"
    tmp_b64.write_text(src_b64.read_text())
    tmp_png = tmp_path / "icon.png"
    monkeypatch.setattr(decode_icon, "B64_PATH", tmp_b64)
    monkeypatch.setattr(decode_icon, "PNG_PATH", tmp_png)
    decode_icon.main()
    assert tmp_png.exists()
    assert tmp_png.read_bytes().startswith(b"\x89PNG\r\n\x1a\n")
