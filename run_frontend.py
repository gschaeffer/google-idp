# generate server.xml with the following command:
#    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
# run as follows:
#    python simple-https-server.py
# then in your browser, visit:
#    https://localhost:4443


from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

web_dir = os.path.join(os.path.dirname(__file__), 'web')
os.chdir(web_dir)

httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
# httpd.socket = ssl.wrap_socket (httpd.socket, server_side=True, certfile='server.pem')
httpd.serve_forever()