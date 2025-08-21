#!/usr/bin/env python3
"""Decode the base64 BrickBox icon into a PNG file.

Reads assets/brickbox-icon.b64 and writes assets/brickbox-icon.png.
"""
import base64
from pathlib import Path

ASSET_DIR = Path(__file__).resolve().parents[1] / "assets"
B64_PATH = ASSET_DIR / "brickbox-icon.b64"
PNG_PATH = ASSET_DIR / "brickbox-icon.png"


def main() -> None:
    data = base64.b64decode(B64_PATH.read_text())
    PNG_PATH.write_bytes(data)
    print(f"Decoded {B64_PATH} -> {PNG_PATH}")


if __name__ == "__main__":
    main()
