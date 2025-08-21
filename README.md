# BrickBox
BrickBox is the modern vault for comic collectors—track runs, tag keys, map continuity, and watch market moves without losing the culture.

## Design Theme
The visual identity uses the base64-encoded icon in `assets/brickbox-icon.b64`. After cloning the repository, run `python scripts/decode_icon.py` (or `base64 -d assets/brickbox-icon.b64 > app/icon.png`) to generate `app/icon.png` and apply the theme’s dark slate background `#111419`, brick red accents `#6A2A29`, and light ivory text `#F5E9D5`.

## Tech Stack Overview
See [STACK.md](STACK.md) for the MVP tooling and the path to scale.

## Docker

Build the multi-stage image and run the server locally:

```sh
docker build -t brickbox .
docker run --rm -p 3000:3000 brickbox
```

## License

BrickBox is released under the [MIT License](LICENSE).
