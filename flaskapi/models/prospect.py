from app import mongo

class Prospect:
    @staticmethod
    def create_prospect(data):
        return mongo.db.prospect.insert_one(data).inserted_id

    @staticmethod
    def get_all_prospects():
        return mongo.db.prospect.find()
