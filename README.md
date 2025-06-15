# 🚀 Kyroshop E-Commerce Dashboard
A full-fledged **eCommerce solution** build on **Django/React**, featuring a modern UI, powerful admin panel, and a user-friendly shopping experience. 

### 🔹 **Dashboard**
- 📦 **Product and Category**
- 📦 **Order history & tracking**
- 🔧 **Profile customization**

## 🛠️ Installation Guide

### 🔹 **Step 1: Clone the Repository**
```sh
git clone https://github.com/fahrurben/kyroshop.git
cd kyroshop
```

### 🔹 **Step 2: Install Backend**
```sh
cd kyroshop-backend
# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 🔹 **Step 3: Install Frontend**
```sh
cd kyroshop-frontend
npm install
npm run dev
```

## 📷 Screenshots

### **Product Management**
![image](https://github.com/user-attachments/assets/de787786-be30-4062-b082-f6fb4bd88ee8)

### **Product Create/Update**
![screencapture-localhost-5173-products-edit-8-2025-06-15-18_03_05](https://github.com/user-attachments/assets/98c491bc-e043-4688-8c36-e2a0ad9cb6e3)

### **Customer Dashboard**
![image](https://github.com/user-attachments/assets/c248b219-0302-4c13-8106-d8347c505c74)

### **Order Dashboard**
![image](https://github.com/user-attachments/assets/4a4677db-cc4a-4353-a501-d5b0de3da82e)

