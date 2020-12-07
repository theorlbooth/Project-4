from flask import Blueprint, request
from marshmallow import ValidationError

import requests

import os
from dotenv import load_dotenv
load_dotenv()

TRIPOSO_API_KEY = os.getenv('TRIPOSO_API_KEY')
TRIPOSO_ACCOUNT = os.getenv('TRIPOSO_ACCOUNT')


router = Blueprint(__name__, 'cities')



@router.route('/cities/<city_id>', methods=['GET'])
def get_country_data(city_id):

  # ! CITY INFO
  resp_city = requests.get(f'https://www.triposo.com/api/20201111/location.json?id={city_id}&fields=all&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')
  
  resp_eat = requests.get(f'https://www.triposo.com/api/20201111/poi.json?location_id={city_id}tag_labels=eatingout&count=10&fields=id,name,score,intro,tag_labels,best_for&order_by=-score&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

  resp_drink = requests.get(f'https://www.triposo.com/api/20201111/poi.json?location_id={city_id}&tag_labels=poitype-Bar&count=10&fields=id,name,score,intro,tag_labels,best_for&order_by=-score&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

  resp_see = requests.get(f'https://www.triposo.com/api/20201111/poi.json?location_id={city_id}&tag_labels=sightseeing&count=10&fields=id,name,score,intro,tag_labels,best_for&order_by=-score&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

  results ={}

  # print(resp)
  # if not resp:
  #   return { 'message': 'no bueno' }, 404
  #  ! city
  results_city_dict = resp_city.json()
  results_city_list = results_city_dict['results']
  results_city = results_city_list[0]

  #  ! eat
  results_eat_dict = resp_eat.json()
  results_eat_list = results_eat_dict['results']
  results_eat = results_eat_list[0]
  
    #  ! drink
  results_drink_dict = resp_drink.json()
  results_drink_list = results_drink_dict['results']
  results_drink = results_drink_list[0]

  #  ! see
  results_see_dict = resp_see.json()
  results_see_list = results_see_dict['results']
  results_see= results_see_list[0]
 

  
  results = {
    "city_info": results_city,
    "eat": results_eat,
    "drink": results_drink,
    "see": results_see
  }
  return results