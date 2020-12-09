# from flask import Blueprint, request
# from serializers.country_info import CountryInfoSchema
# from marshmallow import ValidationError

# import requests

# import os
# from dotenv import load_dotenv
# load_dotenv()

# TRIPOSO_API_KEY = os.getenv('TRIPOSO_API_KEY')
# TRIPOSO_ACCOUNT = os.getenv('TRIPOSO_ACCOUNT')

# # country_info_schema = CountryInfoSchema()

# router = Blueprint(__name__, 'search')


#  # ! URL NOT FOUND FOR THESE... WHAT AM I MISSING??
# @router.route('/country_search/<search>', methods=['GET'])
# def get_matching_countrires(search):
#   resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=country&annotate=trigram:{search}&trigram=>=0.3&count=1&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

#   return resp.json()

# @router.route('/city_search/<search>', methods=['GET'])
# def get_matching_countrires(search):
#   resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=city&annotate=trigram:{search}&trigram=>=0.3&count=1&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

#   return resp.json()