# Triapprend

A tool for collecting and visualizing event data from [connpass.com](https://connpass.com).

## Overview

This project consists of two main components:
- A Rust-based CLI tool for fetching event data
- A Next.js web application for displaying the events

## Getting Started

### CLI Tool

The CLI tool allows you to fetch event data from the connpass.com API by date.

```rust
cargo run -- --ymd YYYYMMDD
```

### Data Collection Script

Alternatively, you can use the Python script to collect event data:

```python
python scripts/collector.py YYYYMMDD
```

### Web Application

To run the web application:

```bash
cd web
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/` - Rust CLI tool source code
- `scripts/` - Python scripts for data collection
- `web/` - Next.js web application (see [web/README.md](web/README.md) for more details)

## License

See the [LICENSE](LICENSE) file for details.
