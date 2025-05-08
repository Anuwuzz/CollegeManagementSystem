from flask import Flask, request, jsonify
import csv
import os
from flask_cors import CORS
from collections import defaultdict
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app)
DATA_FILE = os.path.join("data", "feedback.csv")

@app.route('/', methods=['POST'])
def feedback():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400

    faculty = data.get('faculty')
    subject = data.get('subject')
    rating = data.get('rating')
    comments = data.get('comments')

    if not all([faculty, subject, rating, comments]):
        return jsonify({'error': 'Missing fields'}), 400

    with open(DATA_FILE, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([faculty, subject, rating, comments])

    return jsonify({'message': 'Feedback submitted successfully'}), 200

@app.route('/top5', methods=['GET'])
def top5_faculty():
    faculty_ratings = defaultdict(list)

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if len(row) >= 3:
                    try:
                        faculty = row[0]
                        rating = float(row[2])
                        faculty_ratings[faculty].append(rating)
                    except ValueError:
                        continue

    avg_ratings = {
        faculty: sum(ratings) / len(ratings)
        for faculty, ratings in faculty_ratings.items()
        if ratings
    }

    top5 = sorted(avg_ratings.items(), key=lambda x: x[1], reverse=True)[:5]
    return jsonify({'top5': top5})

@app.route('/visualizations', methods=['GET'])
def visualizations():
    if not os.path.exists(DATA_FILE):
        return jsonify({'error': 'No data available'}), 404

    df = pd.read_csv(DATA_FILE, names=['Faculty', 'Subject', 'Rating', 'Comments'])

    bar_image = create_bar_chart(df)
    pie_image = create_pie_chart(df)

    return jsonify({'bar_image': bar_image, 'pie_image': pie_image})

def create_bar_chart(df):
    avg_ratings = df.groupby('Faculty')['Rating'].mean()
    plt.figure(figsize=(10, 6))
    avg_ratings.plot(kind='bar', color='skyblue')
    plt.title('Average Ratings by Faculty')
    plt.xlabel('Faculty')
    plt.ylabel('Average Rating')
    plt.xticks(rotation=0)
    plt.tight_layout()

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return base64.b64encode(img.getvalue()).decode('utf-8')

def create_pie_chart(df):
    rating_counts = df['Rating'].value_counts()
    plt.figure(figsize=(6, 6))
    rating_counts.plot(kind='pie', autopct='%1.1f%%', startangle=90, cmap='viridis')
    plt.title('Distribution of Ratings')
    plt.ylabel('')
    plt.tight_layout()

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return base64.b64encode(img.getvalue()).decode('utf-8')

if __name__ == '__main__':
    app.run(debug=True)
