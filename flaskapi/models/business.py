from db import mongo

class Business:
    @staticmethod
    def get_business_by_id(business_id):
        # Ensure to use the correct collection name
        business = mongo.db.businesses.find_one({"_id": business_id})
        if business:
            # Convert ObjectId to string if needed
            business["_id"] = str(business["_id"])
        return business
