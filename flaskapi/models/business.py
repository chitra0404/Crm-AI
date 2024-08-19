from bson.objectid import ObjectId

class Business:
    @staticmethod
    def get_business_by_id(business_id):
        from app import mongo  # Import mongo here to avoid circular import
        return mongo.db.business.find_one({"_id": ObjectId(business_id)})
