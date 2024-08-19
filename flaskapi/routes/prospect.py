from flask import Blueprint, jsonify, request
from models.business import Business

prospect_bp = Blueprint('prospect_bp', __name__)

@prospect_bp.route('/get_business/<business_id>', methods=['GET'])
def get_business(business_id):
    business = Business.get_business_by_id(business_id)
    if business:
        return jsonify(business), 200
    else:
        return jsonify({"error": "Business not found"}), 404
