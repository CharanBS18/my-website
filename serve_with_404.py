#!/usr/bin/env python3
"""
Simple static file server that returns `404.html` for any unknown path.

Usage:
  python3 serve_with_404.py [port]

This serves files from the current working directory (the repo root).
If a requested path doesn't map to an existing file, the server responds
with the `404.html` file (if present) and a 404 status code. This is
useful for local testing so requests like `/goat` return your custom 404 page.
"""

import http.server
import socketserver
import sys
import os
from urllib.parse import urlparse, unquote


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Normalize path and remove query
        parsed = urlparse(self.path)
        path = unquote(parsed.path)

        # Protect against directory traversal (SimpleHTTPRequestHandler.translate_path handles this)
        fs_path = self.translate_path(path)

        # If path is a directory, try to serve index.html inside it
        if os.path.isdir(fs_path):
            for index in ("index.html", "index.htm"):
                index_path = os.path.join(fs_path, index)
                if os.path.exists(index_path):
                    return super().do_GET()
            # No index file, fall through to 404

        # If file exists, serve normally
        if os.path.exists(fs_path) and os.path.isfile(fs_path):
            return super().do_GET()

        # Otherwise, serve custom 404 page if available
        not_found_file = os.path.join(os.getcwd(), "404.html")
        if os.path.exists(not_found_file):
            try:
                with open(not_found_file, "rb") as fh:
                    content = fh.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception:
                # If something goes wrong reading the custom 404, fall back to default message
                pass

        # Fallback: default SimpleHTTPRequestHandler 404
        self.send_error(404, "File not found.")


def run(port=8000):
    port = int(port)
    handler = Handler
    with socketserver.ThreadingTCPServer(("", port), handler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {port} (http://localhost:{port}/) ...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server")
            httpd.shutdown()


if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Port must be an integer")
            sys.exit(1)
    run(port)
