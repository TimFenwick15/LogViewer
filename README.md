# LogViewer
Use a Python SimpleHTTPServer to view .log files in a directory across a network.

To use:
- Ensure Python is installed
- Open a Terminal and cd to the directory you want to serve
- Run (example for port 8000): $ python -m SimpleHTTPServer 8000
- Place the files in this directory
- Go to the url: <computername>:8000/home.html
