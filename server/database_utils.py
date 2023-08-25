
from app import app
from models import db, Squish




def delete_records():
    with app.app_context():
        Squish.query.delete()
        db.session.commit()
    
def create_records():
    with app.app_context():
        
        squishes = []
        s1 = Squish(name='Bruce the Walrus', image='https://static.wikia.nocookie.net/squishmallowpedia/images/d/d2/Bruce.jpg/revision/latest/scale-to-width-down/350?cb=20200501002243',
        bio="Want to explore the beauty of Alaska? Bruce is your guy! An active kayaker, Bruce leads travelers on amazing river tours and shows them all of his favorite hidden gems. Get ready for a photo opp!")
        squishes.append(s1)
        s2 = Squish(name='Ricky', image='https://static.wikia.nocookie.net/squishmallowpedia/images/4/48/Summer_Ricky.jpg/revision/latest/scale-to-width-down/350?cb=20200501002709', 
        bio="Living up to his species, Ricky the Clownfish knows how to make all the other Squishmallows laugh! Catch him at his next open mic night and see for yourself!")
        squishes.append(s2)
        s3 = Squish(name='Tristan', image='https://static.wikia.nocookie.net/squishmallowpedia/images/1/1a/Summer_tristan.jpg/revision/latest/scale-to-width-down/350?cb=20200501003301',
        bio="Want to get in shape? Schedule a session with Tristan, an amazing personal trainer! He's training for a body building competition right now, and after that, a marathon!")
        squishes.append(s3)
        
        
        db.session.add_all(squishes)
        db.session.commit()
        
        return squishes