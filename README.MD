### panduan

Document Management App

Langkah instalasi

1. Sertakan konfigurasi env di project ini dengan .env.example sebagai referensi
2. Jalankan npm install
3. jalankan perintah npx sequelize-cli db:migrate untuk migrasi tabel
4. jalankan perintah npx sequelize-cli db:seed:all untuk membuat user default admin dan user

Default user

- role admin
  admin@gmail.com
  admin12345
- role user
  andiabdillah004@gmail.com
  user12345

4.  jalankan npm run start

Tools yang digunakan?

- Node.js JavaScript run-time environment
- Express Node.js framework
- Typescript untuk type checking
- Prettier Code Formatting
- Git untuk kolaborasi
- sql server
- docker ( untuk menjalankan container image sql server )

package

- sequelize
- Nodemon
- connect-flash
- cookie-parser
- ejs
- multer
- other staff like basic npm for express development

Default user

1. role admin
   admin@gmail.com
   admin12345
2. role user
   user@gmail.com
   user12345

# Catatan

- harus menyertakan konfigurasi file env, lihat .env.example
- di repository ini terdapat video demo aplikasi

# npm start or npm run dev

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

# npm run build

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.
