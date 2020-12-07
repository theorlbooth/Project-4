from flask import Blueprint, request
from models.country_info import CountryInfo
from serializers.country_info import CountryInfoSchema
from marshmallow import ValidationError

import requests

country_info_schema = CountryInfoSchema()

router = Blueprint(__name__, 'countries_info')



@router.route('/countries/<countrycode>', methods=['GET'])
def get_country_data(countrycode):
  resp = requests.get(f'https://www.triposo.com/api/20201111/location.json?tag_labels=country&countrycode={countrycode}&account=13H4CGCD&token=q70ac3dye4rnb1gsnvovoaoic854jjy1')
  
  results ={}

  print(resp)
  if not resp:
    return { 'message': 'no bueno' }, 404

  results_dict = resp.json()
  results_list = results_dict['results']
  results1 = results_list[0]

  resp2 = requests.get(f'https://www.triposo.com/api/20201111/location.json?countrycode={countrycode}&tag_labels=city&count=10&fields=id,name,score,snippet&order_by=-score&account=13H4CGCD&token=q70ac3dye4rnb1gsnvovoaoic854jjy1')
  results2_dict = resp2.json()
  results2 = results2_dict['results']
 

  
  results = {
    "country_info": results1,
    "top_cities": results2
  }
  return results