import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
   def setUp(self):
      self.app = create_app(TestConfig)
      self.client = self.app.test_client()

      with self.app.app_context():
         # db.init_app(self.app)
         db.create_all()

   def test_hello_world(self):
      hello_response = self.client.get('/blog/hello')
      json = hello_response.json
      #  print(json)
      self.assertEqual(hello_response.status_code, 200)
      self.assertEqual(json['message'], 'Hello, World!')

   def test_signup(self):
      signup_response = self.client.post('/auth/signup',
         json={
               'username': 'testuser',
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      status_code = signup_response.status_code
      self.assertEqual(status_code, 200)

   def test_login(self):
      signup_response = self.client.post('/auth/signup',
         json={
               'username': 'testuser',
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      login_response = self.client.post('/auth/login',
         json={
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      status_code = login_response.status_code
      json = login_response.json
      # print(json)
      self.assertEqual(status_code, 200)

   def test_get_all_blogs(self):
        """Test get all blogs"""
        response = self.client.get('/blog/blogs')
      #   print(response.json)
        status_code = response.status_code
        self.assertEqual(status_code, 200)

   def test_get_blog_by_id(self):
        """Test get blog by id"""
        id = 1
        response = self.client.get(f'/blog/blogs/{id}')
        status_code = response.status_code
        self.assertEqual(status_code, 404)

   def test_create_blog(self):
      signup_response = self.client.post('/auth/signup',
         json={
               'username': 'testuser',
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      login_response = self.client.post('/auth/login',
         json={
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      access_token = login_response.json['access_token']

      create_blog_response = self.client.post('/blog/blogs',
         headers={
               'Authorization': f'Bearer {access_token}'
         },
         json={
               "title": "Good",
               "description": "he works at @google",
               "author": "khan"
         }
      )
      status_code = create_blog_response.status_code
      json = create_blog_response.json
      print(json)
      self.assertEqual(status_code, 201)

   def test_update_blog(self):
      signup_response = self.client.post('/auth/signup',
         json={
               'username': 'testuser',
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      login_response = self.client.post('/auth/login',
         json={
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      access_token = login_response.json['access_token']

      id = 1
      update_blog_response = self.client.put(f'/blog/blogs/{id}',
         headers={
               'Authorization': f'Bearer {access_token}'
         },
         json={
               "title": "Good",
               "description": "he works at @google",
               "author": "khan"
         }
      )
      status_code = update_blog_response.status_code
      self.assertEqual(status_code, 404)
   
   def test_delete_blog(self):
      signup_response = self.client.post('/auth/signup',
         json={
               'username': 'testuser',
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      login_response = self.client.post('/auth/login',
         json={
               'email': 'testuser@gmail.com',
               'password': 'password'
         }
      )
      access_token = login_response.json['access_token']

      id = 1
      delete_blog_response = self.client.delete(f'/blog/blogs/{id}',
         headers={
               'Authorization': f'Bearer {access_token}'
         }
      )
      status_code = delete_blog_response.status_code
      self.assertEqual(status_code, 404)

   def tearDown(self):
      with self.app.app_context():
         db.session.remove()
         db.drop_all()

if __name__ == '__main__':
    unittest.main()