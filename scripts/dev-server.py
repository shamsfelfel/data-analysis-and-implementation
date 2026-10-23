"""dev-server.py - a static server for authoring, with caching turned off.

    python3 scripts/dev-server.py [port]      # default 8088

Serves the repo root like `python -m http.server`, but answers every request
with `Cache-Control: no-store`, so an edited page, script or stylesheet shows
up on a plain reload instead of being served from the browser cache.

Use the plain `http.server` instead when you want to test the real thing --
the service worker, the install prompt, offline. Those need the normal caching
behaviour to mean anything, and they need http(s): service workers are not
available from a file:// URL, though every other part of the course is.
"""
import functools
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write('%s %s\n' % (self.address_string(), fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8088
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    with Server(('127.0.0.1', port), handler) as httpd:
        print('Programming-AI dev server (no-store) on http://localhost:%d  root=%s'
              % (port, ROOT), flush=True)
        httpd.serve_forever()
