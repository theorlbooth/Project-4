from flask import Blueprint, request
from models.country_info import CountryInfo
from serializers.country_info import CountryInfoSchema
from marshmallow import ValidationError

import requests

import os
from dotenv import load_dotenv
load_dotenv()

TRIPOSO_API_KEY = os.getenv('TRIPOSO_API_KEY')
TRIPOSO_ACCOUNT = os.getenv('TRIPOSO_ACCOUNT')

country_info_schema = CountryInfoSchema()

router = Blueprint(__name__, 'countries_info')



@router.route('/countries/<countrycode>', methods=['GET'])
def get_country_data(countrycode):
  resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=country&countrycode={countrycode}&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')
  
  results ={}

  print(resp)
  if not resp:
    return { 'message': 'no bueno' }, 404

  results_dict = resp.json()
  results_list = results_dict['results']
  results1 = results_list[0]

  resp2 = requests.get(f'https://www.triposo.com/api/20201111/location.json?countrycode={countrycode}&tag_labels=city&count=10&fields=id,name,score,snippet&order_by=-score&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')
  results2_dict = resp2.json()
  results2 = results2_dict['results']
 


  results = {
    "country_info": results1,
    "top_cities": results2
  }
  print(results)
  return results

  # ! URL NOT FOUND FOR THESE... WHAT AM I MISSING??
  @router.route('/country_search/<search>', methods=['GET'])
  def get_matching_countries(search):
    resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=country&annotate=trigram:{search}&trigram=>=0.3&count=1&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

    return resp.json()

  @router.route('/city_search/<search>', methods=['GET'])
  def get_matching_cities(search):
    resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=city&annotate=trigram:{search}&trigram=>=0.3&count=1&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

    return resp.json()

