from exts import db

class Blogs(db.Model):
      # __tablename__ = 'blogs'
      id = db.Column(db.Integer, primary_key=True)
      title = db.Column(db.String(100), nullable=False)
      description = db.Column(db.Text, nullable=False)
      author = db.Column(db.String(50), nullable=False)

   
      def __repr__(self):
         return f'<Blog {self.title}>'

      def save(self):
         db.session.add(self)
         db.session.commit()
      
      def delete(self):
         db.session.delete(self)
         db.session.commit()

      def update(self, title, description, author):
         self.title = title
         self.description = description
         self.author = author
         db.session.commit()