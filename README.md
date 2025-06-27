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
![image](https://github.com/user-attachments/assets/2e58e40c-663f-4d5e-9e36-cf83984e6c89)

### **Product Create/Update**
![screencapture-localhost-5173-products-edit-13-2025-06-27-16_03_58](https://github.com/user-attachments/assets/c025a1eb-dfa2-420a-a0e0-c321bc11dc12)

### **Customer Dashboard**
![image](https://github.com/user-attachments/assets/c248b219-0302-4c13-8106-d8347c505c74)

### **Order Dashboard**
![image](https://github.com/user-attachments/assets/4a4677db-cc4a-4353-a501-d5b0de3da82e)

