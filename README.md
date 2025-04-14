# blogList

volver a https://fullstackopen.com/es/part4/estructura_de_la_aplicacion_backend_introduccion_a_las_pruebas#ejercicios-4-3-4-7

faltaron ultimas 2

test
npm test -- tests/blog_api.test.js

connected to MongoDB
Method: GET
Path: /api/blogs
Body: {}

---

Method: GET
Path: /favicon.ico
Body: {}

---

Method: POST
Path: /api/blogs
Body: {
title: 'Segundo post',
author: 'Miguelangel',
url: 'https://miguelangelmartinez.info',
likes: 9
}

---

Method: GET
Path: /api/blogs
Body: {}

---

Method: POST
Path: /api/blogs
Body: {
title: 'Tercer post',
author: 'SanMiguel',
url: 'https://miguelangelmartinez.info',
likes: 8
}

---

Method: GET
Path: /api/blogs
Body: {}

---

Method: PUT
Path: /api/blogs
Body: {
title: 'Tercer post',
author: 'SanMiguel',
url: 'https://miguelangelmartinez.info',
likes: 900
}

---

Method: GET
Path: /api/blogs
Body: {}

---

Method: GET
Path: /api/blogs/67fd84abc248932a896ab02f
Body: {}

---

Method: PUT
Path: /api/blogs/67fd84abc248932a896ab02f
Body: { likes: 900 }

---

Method: GET
Path: /api/blogs/67fd84abc248932a896ab02f
Body: {}
