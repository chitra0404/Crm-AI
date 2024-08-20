from db import mongo
from bson.objectid import ObjectId

class Prospect:
    @staticmethod
    def add_prospect(business_id, prospect_name,location,sectortype, contact_info):
        prospect = {
            "business_id": ObjectId(business_id),
            "prospect_name": prospect_name,
            "location":location,
            "sectortype":sectortype,
            "contact_info": contact_info
        }
        result = mongo.db.prospects.insert_one(prospect)
        return result.inserted_id

    @staticmethod
    def get_prospect_by_id(prospect_id):
        prospect = mongo.db.prospects.find_one({"_id": ObjectId(prospect_id)})
        if prospect:
            prospect["_id"] = str(prospect["_id"])
        return prospect
