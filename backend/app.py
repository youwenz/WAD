from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from datetime import datetime
from flask import Flask, render_template


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow CORS for your React Native app

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.form.get('message')
    # Broadcast the message to all connected clients
    socketio.emit('message_broadcast', {'sender': 'Admin', 'text': message})
    print(f"Received message: {message}")
    return "Message received!"

@app.route('/')
def index():
    return "Flask server is running!"

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('response', {'message': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message_sent')
def handle_message(data):
    print('Received message:', data)
    data['timestamp'] = str(datetime.now())
    emit('message_broadcast', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
