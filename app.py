from flask import Flask, render_template

app = Flask('Hubbix')

@app.route('/')
def home():
    return render_template('index.html')

app.run(debug=True)