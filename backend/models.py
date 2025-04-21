from exts import db

class Blogs(db.Model):
      # __tablename__ = 'blogs'
      id = db.Column(db.Integer, primary_key=True)
      title = db.Column(db.String(100), nullable=False)
      description = db.Column(db.Text, nullable=False)
      author = db.Column(db.String(50), nullable=False)
      image = db.Column(db.String(500), nullable=True)
   
      def __repr__(self):
         return f'<Blog {self.title}>'

      def save(self):
         db.session.add(self)
         db.session.commit()
      
      def delete(self):
         db.session.delete(self)
         db.session.commit()

      def update(self, title, description, author, image):
         self.title = title
         self.description = description
         self.author = author
         self.image = image
         db.session.commit()

class User(db.Model):
      id = db.Column(db.Integer, primary_key=True)
      username = db.Column(db.String(50), nullable=False)
      email = db.Column(db.String(100), unique=True, nullable=False)
      password = db.Column(db.String(200), nullable=False)

      def __repr__(self):
         return f'<User {self.username}>'

      def save(self):
         db.session.add(self)
         db.session.commit()

      def delete(self):
         db.session.delete(self)
         db.session.commit()