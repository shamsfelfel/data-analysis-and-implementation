"""test-server.py - the static server the end-to-end suite runs against.

    python3 scripts/test-server.py [port]      # default 8099

Deliberately *not* scripts/dev-server.py: that one sends `Cache-Control:
no-store`, which is right while authoring and wrong here, because half of what
the suite checks is that the course caches itself and keeps working offline.

What it adds over `python3 -m http.server` is headroom. Playwright runs several
workers at once and every page pulls a dozen or so assets, so the listen queue
on the stock server overflows and the browser sees a refused connection rather
than a slow one. A deeper backlog and threads make the suite's failures real
failures instead of load artefacts.
"""
import functools
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"   # keep-alive: far fewer connections to queue

    def end_headers(self):
        # The service worker is fetched with {cache: 'reload'} anyway, but a
        # stale worker in a browser profile makes for baffling test failures.
        if self.path.endswith("sw.js"):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass        # the suite's own reporter is the output that matters


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    request_queue_size = 128


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
    handler = functools.partial(Handler, directory=ROOT)
    with Server(("127.0.0.1", port), handler) as httpd:
        print("test server on http://127.0.0.1:%d  root=%s" % (port, ROOT), flush=True)
        httpd.serve_forever()
