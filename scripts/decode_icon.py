#!/usr/bin/env python3
"""Decode the base64 BrickBox icon into a PNG file.

Reads assets/brickbox-icon.b64 and writes app/icon.png.
"""
import base64
import binascii
import logging
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT_DIR / "assets"
B64_PATH = ASSET_DIR / "brickbox-icon.b64"
APP_DIR = ROOT_DIR / "app"
PNG_PATH = APP_DIR / "icon.png"


def main() -> None:
    APP_DIR.mkdir(parents=True, exist_ok=True)

    try:
        b64_text = B64_PATH.read_text()
    except FileNotFoundError:
        logging.error("Base64 icon file not found: %s", B64_PATH)
        return

    try:
        normalized = "".join(b64_text.split())
        data = base64.b64decode(normalized, validate=True)
    except (binascii.Error, ValueError) as exc:
        logging.error("Malformed base64 data in %s: %s", B64_PATH, exc)
        return

    PNG_PATH.write_bytes(data)
    print(f"Decoded {B64_PATH} -> {PNG_PATH}")


if __name__ == "__main__":
    main()
