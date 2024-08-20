from flask import Blueprint, jsonify, request

prospect_bp = Blueprint('prospect_bp', __name__)

# Avoid importing the Prospect class at the top level to prevent circular import
from models.prospect import Prospect  # Import inside the function

@prospect_bp.route('/predict', methods=['POST'])
def predict():
    from models.prospect import Prospect  # Import here to avoid circular import
    
    data = request.json
    business_name = data.get('businessName')
    business_type = data.get('businessType')
    customer_target = data.get('customerTarget')
    location = data.get('location')
    service = data.get('service')

    # Replace with actual prediction logic
    prospects = [
        {"prospectName": "Company A", "location":"chennai","sectortype":"IT","contactInfo": 9999999999},
        {"prospectName": "Company B","location":"pondy","sectortype":"network", "contactInfo": 9090909090}
    ]

    return jsonify(prospects)

@prospect_bp.route('/get_prospect/<prospect_id>', methods=['GET'])
def get_prospect(prospect_id):
    from models.prospect import Prospect  # Import here to avoid circular import
    
    prospect = Prospect.get_prospect_by_id(prospect_id)
    if prospect:
        return jsonify(prospect), 200
    else:
        return jsonify({"error": "Prospect not found"}), 404
