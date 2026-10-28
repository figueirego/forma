#!/usr/bin/env python3
"""WCAG contrast for opaque sRGB hex colors. No dependencies or network."""
import argparse
import math
import re


def luminance(color: str) -> float:
    if not isinstance(color, str) or not re.fullmatch(r"#[0-9a-fA-F]{6}", color):
        raise ValueError("Use opaque sRGB colors in #RRGGBB format.")
    channels = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return sum(c * w for c, w in zip(linear, (0.2126, 0.7152, 0.0722)))


def contrast(foreground: str, background: str) -> float:
    a, b = sorted((luminance(foreground), luminance(background)))
    return (b + 0.05) / (a + 0.05)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("foreground")
    parser.add_argument("background")
    parser.add_argument("--threshold", type=float, default=4.5)
    args = parser.parse_args()
    if not math.isfinite(args.threshold) or not 1 <= args.threshold <= 21:
        parser.error("threshold must be finite and between 1 and 21")
    try:
        ratio = contrast(args.foreground, args.background)
    except ValueError as error:
        parser.error(str(error))
    passed = ratio >= args.threshold
    print(f"{ratio:.4f}:1; threshold {args.threshold:g}:1; {'PASS' if passed else 'FAIL'}")
    print("Comparison uses the unrounded ratio. Opaque colors only; not an accessibility audit.")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
