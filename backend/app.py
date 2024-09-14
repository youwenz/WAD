from flask import Flask, request, jsonify, abort, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow CORS for your React Native app

wishlist = []

# Add item to the wishlist
@app.route('/api/wishlist/add', methods=['POST'])
def add_to_wishlist():
    data = request.json
    print(f"Received data: {data}")
    wishlist.append(data)
    return jsonify({"message": "Item added to wishlist", "wishlist": wishlist}), 200

# Get all wishlist items
@app.route('/api/wishlist/get', methods=['GET'])
def get_wishlist():
    print("Current wishlist:", wishlist) 
    return jsonify(wishlist), 200

# Remove item from the wishlist
@app.route('/api/wishlist/remove', methods=['DELETE'])
def remove_from_wishlist():
    data = request.json
    listing_id = data.get('listing_id')
    
    global wishlist
    wishlist = [item for item in wishlist if item['listing_id'] != listing_id]
    
    return jsonify({"message": "Item removed from wishlist", "wishlist": wishlist}), 200

# Clear wishlist
@app.route('/api/wishlist/clear', methods=['DELETE'])
def clear_wishlist():
    global wishlist
    wishlist = []
    return jsonify({"message": "Wishlist cleared"}), 200

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.form.get('message')
    socketio.emit('message_broadcast', {'sender': 'Admin', 'text': message})
    print(f"Received message: {message}")
    return "Message received!"

@app.route('/')
def home():
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


    return "Message received!"

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)

